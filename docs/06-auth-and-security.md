# 06 — Auth & Security

> Phone-first auth (India reality: phone > email), four roles from `prisma/schema.prisma`
> (`Role`: CUSTOMER · BEAUTICIAN · ADMIN · SUPPORT), and the `OtpCode` table as the single OTP
> source of truth.

## 1. Phone-OTP flow (Auth.js custom Credentials provider)

```mermaid
sequenceDiagram
  participant U as User
  participant W as Web/App
  participant A as Auth.js (credentials)
  participant DB as PostgreSQL
  participant G as MSG91/WhatsApp

  U->>W: enters +91 phone
  W->>A: POST otp/request
  A->>A: rate check (3/10min), normalize E.164
  A->>DB: INSERT OtpCode {phone, codeHash: bcrypt(code), purpose:LOGIN, expiresAt: now+5m}
  A->>G: send 6-digit code (SMS + WhatsApp fallback)
  U->>W: enters code
  W->>A: signIn("otp", {phone, code})
  A->>DB: latest unconsumed OtpCode for (phone, LOGIN)
  A->>A: bcrypt.compare, expiry check, attempts<5
  A->>DB: mark consumed; upsert User (phoneVerified: now())
  A-->>W: JWT session (7d) + rotation
```

Rules:
- Codes are 6 digits, **stored hashed** (`codeHash`), TTL 5 minutes, single-use (`consumed`),
  max 5 verify attempts then the code is invalidated (aligns with rate limits, doc 05 §5).
- `purpose` scopes codes: `LOGIN` | `BOOKING_VERIFY` (customer confirms service start to the
  beautician) | `PAYOUT` (partner bank change). A LOGIN code can never authorize a payout change.
- Session: Auth.js JWT strategy (no DB session table). Claims: `sub` (userId), `role`, `phone`,
  `name`. Web: httpOnly `__Secure` cookie, `SameSite=Lax`. Mobile: same JWT as Bearer token +
  refresh rotation via `/api/v1/auth/refresh` (doc 05).
- New phone = new `User` (role CUSTOMER). Partners log in with the same provider; role checked
  post-auth. Admins additionally require an allowlisted phone + TOTP second factor.

## 2. Role model & route protection (middleware matrix)

`middleware.ts` reads the JWT edge-side and enforces:

| Path prefix | CUSTOMER | BEAUTICIAN | SUPPORT | ADMIN | Anonymous |
|---|---|---|---|---|---|
| `/` marketing, catalog, SEO pages | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/booking` (steps 1–3) | ✅ | ✅ | ✅ | ✅ | ✅ (gate at address step) |
| `/account/*` | ✅ | ✅ (own customer data) | ❌→`/admin` | ❌→`/admin` | ❌→`/login?next=` |
| `/partner/dashboard…profile` | ❌→`/partner/apply` | ✅ (status ACTIVE/ONBOARDING) | ❌ | ✅ (impersonation, audited) | ❌→`/partner/login` |
| `/admin/*` | ❌ 404 | ❌ 404 | ✅ subset | ✅ | ❌ 404 |
| `/api/v1/partner/*` | 403 | ✅ | ❌ | ✅ | 401 |
| `/api/v1/admin/*` | 403 | 403 | ✅ subset | ✅ | 401 |

SUPPORT subset (least privilege): bookings read/assign, refunds ≤ ₹2,000, tickets, review
moderation. Not: catalog/pricing/coupons/payout mutation, role changes, beautician suspension.
Unauthorized `/admin` returns **404, not 403** (don't reveal the panel exists). Every admin
mutation writes an audit row (actorId on `BookingStatusEvent`, plus admin audit log).

## 3. Partner KYC pipeline

States from `KycStatus` + `BeauticianStatus`:

```
applyAsPartner()          docs uploaded          agent review
APPLIED ──────► kyc:PENDING ──► DOCUMENTS_SUBMITTED ──► UNDER_REVIEW ─┬─► VERIFIED
 status:APPLIED                                              │           │
                                                             ▼           ▼
                                                        REJECTED    status:ONBOARDING
                                                       (reason,      (training) ──► ACTIVE
                                                        re-upload)                    │
                                                              SUSPENDED ◄── strikes ──┘
                                                                  └──► DEACTIVATED
```

| Gate | Enforcement |
|---|---|
| Required docs | AADHAAR, PAN, BANK_PROOF, POLICE_VERIFICATION (CERTIFICATE optional) — `BeauticianDocument.type` |
| Job eligibility | Offers only when `status=ACTIVE ∧ kycStatus=VERIFIED ∧ skill certified` |
| Payout eligibility | Bank proof verified; bank change requires PAYOUT-purpose OTP + 48 h payout hold |
| Doc storage | Private bucket, signed URLs (15 min), never public; verifier identity + timestamp recorded (`verifiedAt`) |
| SLA | Review ≤ 48 h; every transition notifies via SMS/WhatsApp |

## 4. OWASP-relevant protections

| Risk | Control |
|---|---|
| A01 Broken access control | Middleware matrix + per-query ownership (`where: {userId: session.sub}` — never trust ids from client); IDOR tests on `/bookings/{code}` |
| A02 Crypto failures | TLS everywhere; OTP hashed; JWT `AUTH_SECRET` 256-bit; no card data at rest (§6) |
| A03 Injection | Prisma parameterized queries only; Zod on every action/route input (`actions.ts` pattern); no raw SQL without `Prisma.sql` |
| A04 Insecure design | Rate limits (doc 05 §5), OTP purpose scoping, refund authority tiers |
| A05 Misconfig | Security headers via `next.config.ts`: HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, CSP (script-src 'self' + checkout.razorpay.com + maps.googleapis.com) |
| A07 Auth failures | OTP throttles; verify-attempt cap; admin TOTP; session rotation on role change |
| A08 Integrity | Webhook signature verification (§6); `Idempotency-Key` replay protection |
| A09 Logging | Structured logs w/ requestId; auth failures + refunds + role changes alerted (doc 10) |
| SSRF/A10 | No user-supplied URLs fetched server-side; image uploads via presigned PUT only |
| CSRF | Server Actions: Next.js origin checks; API: Bearer-token (no cookie) for mobile |
| XSS | React escaping; JSON-LD via `jsonLdScriptProps()` which escapes `<` (`seo.ts`); no `dangerouslySetInnerHTML` elsewhere |

## 5. Payment security

- **Never store card/UPI data.** Razorpay/Stripe checkout captures instruments; we persist only
  `razorpayOrderId/PaymentId`, `stripeIntentId`, amount, status (`Payment` model).
- Amounts are computed **server-side** from catalog + coupon rules; the client's `total` is
  displayed, never trusted (the current `createBooking` accepts `total` for the mock — production
  recomputes and rejects mismatch).
- Webhook verification sketch:

```ts
// app/api/webhooks/razorpay/route.ts
import crypto from "node:crypto";

export async function POST(req: Request) {
  const raw = await req.text();                        // RAW body, not parsed JSON
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(raw)
    .digest("hex");
  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return new Response("invalid signature", { status: 401 });

  const event = JSON.parse(raw);
  if (await alreadyProcessed(event.id)) return Response.json({ received: true });
  await enqueue(event);                                // ack fast, work async
  return Response.json({ received: true });
}
```

- Client-side checkout callback (`razorpay_payment_id/order_id/signature`) is verified the same
  HMAC way but is only a UX hint — **the webhook is the source of truth** for `CAPTURED`.
- Refunds only via provider APIs referencing the original payment; wallet credits are ledgered
  (`WalletTransaction`, `balanceAfter` for reconciliation).

## 6. PII under India's DPDP Act 2023

| Obligation | Implementation |
|---|---|
| Notice & consent | Consent checkbox at OTP signup linking `/privacy` (plain-language, English+Hindi); separate opt-in for marketing WhatsApp vs transactional |
| Purpose limitation | Data inventory: phone/name/address → service delivery; DOB/gender → optional personalization; partner Aadhaar/PAN → KYC only, never marketing |
| Data principal rights | `/account/profile`: export my data (JSON), correct, delete. Deletion = anonymize User (phone→hash, name→"Deleted user"), keep financial records (Payment/Payout) for statutory retention |
| Children | 18+ self-attestation; no tracking of minors |
| Breach notification | Incident runbook: notify Data Protection Board + affected users "without delay"; Sentry+alerting feeds detection (doc 10) |
| Data minimization | Beautician sees locality + first name until day-of-service; full address revealed on EN_ROUTE; phone numbers masked via call bridge |
| Storage | Primary region Mumbai (`ap-south-1` / Neon Singapore fallback assessed); processor DPAs with Razorpay, MSG91, Meta (WhatsApp BSP), Vercel |
| Retention | OTP rows purged after 24 h (cron); notification payloads 90 days; inactive accounts anonymized after 3 years' notice cycle |
| Logs | No PII in logs — userId/bookingCode only; phone always masked (`+91••••4321`) |
