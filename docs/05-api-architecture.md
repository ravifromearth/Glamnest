# 05 — API Architecture

> Two mutation surfaces, one brain. The **web app** mutates via Server Actions
> (`src/server/actions.ts` pattern); the **mobile app + integrations** use versioned Route
> Handlers under `/api/v1`. Both call the same service layer (`src/server/services/*`) so business
> rules live exactly once.

```
Next.js app
├── Server Actions  ──┐        (web forms/wizard; progressive enhancement)
├── /api/v1/*  ────────┼──► service layer (booking, catalog, wallet, payout)
│   (mobile, webhooks) │        └── Prisma ──► PostgreSQL
└── /api/webhooks/* ───┘        └── side-effects: Razorpay, WhatsApp/MSG91/Resend
```

## 1. Split rule: Server Action vs API route

| Mutation | Surface | Why |
|---|---|---|
| `createBooking`, `submitContact`, `applyAsPartner` (exist today) | Server Action | Web-only forms, CSRF-safe by default, no client SDK needed |
| Address CRUD, review submit, coupon apply (web) | Server Action | Same |
| Everything the mobile app calls | `/api/v1` | App can't invoke actions; needs stable versioned contract |
| Payment/WhatsApp callbacks | `/api/webhooks/*` | External callers, signature-verified, unversioned path pinned by provider config |
| Slot availability reads | `/api/v1/slots` (also used by web via TanStack Query) | High-frequency polling read; cacheable |

Actions are thin wrappers: Zod-parse → call service → return `{ok:true,…}|{ok:false,error}`
(the discriminated union already used in `actions.ts`). API routes wrap the same services in the
HTTP envelope below.

## 2. Endpoint table — `/api/v1`

Auth: `Authorization: Bearer <JWT>` (Auth.js-issued, see doc 06). 🔓 public · 🔐 customer ·
🅿 beautician · 🅰 admin/support.

| Method & path | Auth | Purpose |
|---|---|---|
| POST `/api/v1/auth/otp/request` | 🔓 | Send OTP to phone (creates `OtpCode`, purpose LOGIN) |
| POST `/api/v1/auth/otp/verify` | 🔓 | Verify code → issue JWT + refresh token; creates User if new |
| POST `/api/v1/auth/refresh` | 🔓 | Rotate refresh token |
| GET `/api/v1/catalog/categories` | 🔓 | 10 categories |
| GET `/api/v1/catalog/services?category=` | 🔓 | Services incl. packages/add-ons |
| GET `/api/v1/catalog/services/{cat}/{slug}` | 🔓 | Service detail |
| GET `/api/v1/catalog/packages` | 🔓 | Occasion packages |
| GET `/api/v1/catalog/membership-plans` | 🔓 | Glow/Luxe/Royale |
| GET `/api/v1/cities` | 🔓 | Cities + live flags + service areas |
| GET `/api/v1/slots?serviceId&date&areaId` | 🔓 | Available slots (doc 07 algorithm) |
| POST `/api/v1/coupons/validate` | 🔐 | `{code, subtotal}` → discount or error |
| GET/POST `/api/v1/addresses`, PATCH/DELETE `/api/v1/addresses/{id}` | 🔐 | Address book |
| POST `/api/v1/bookings` | 🔐 | Create booking (idempotent, §6) |
| GET `/api/v1/bookings?status=&cursor=` | 🔐 | My bookings |
| GET `/api/v1/bookings/{code}` | 🔐 | Detail + status timeline |
| POST `/api/v1/bookings/{code}/cancel` | 🔐 | Cancel (matrix in doc 07) |
| POST `/api/v1/bookings/{code}/reschedule` | 🔐 | New date/slot |
| POST `/api/v1/bookings/{code}/review` | 🔐 | Rating + hygieneRating + comment |
| GET `/api/v1/wallet` / `/api/v1/wallet/transactions?cursor=` | 🔐 | Balance / ledger |
| POST `/api/v1/gift-cards` / POST `/api/v1/gift-cards/redeem` | 🔐 | Buy / redeem to wallet |
| GET `/api/v1/referrals` | 🔐 | Code, stats, earnings |
| GET/POST `/api/v1/memberships` | 🔐 | My plan / subscribe |
| GET `/api/v1/notifications?cursor=` · POST `/{id}/read` | 🔐 | In-app inbox |
| POST `/api/v1/devices` | 🔐🅿 | Register FCM push token |
| GET `/api/v1/partner/profile` · PATCH | 🅿 | Bio, skills, areas |
| POST `/api/v1/partner/online` | 🅿 | Toggle `isOnline` + heartbeat lat/lng |
| GET `/api/v1/partner/jobs?filter=today` | 🅿 | Assigned + offered jobs |
| POST `/api/v1/partner/jobs/{code}/accept` · `/decline` | 🅿 | Offer response (90s TTL) |
| POST `/api/v1/partner/jobs/{code}/status` | 🅿 | `EN_ROUTE→IN_PROGRESS→COMPLETED` transitions |
| GET/PUT `/api/v1/partner/availability` | 🅿 | Weekly `AvailabilitySlot` grid |
| GET `/api/v1/partner/earnings?period=` | 🅿 | Payout statements |
| POST `/api/v1/partner/kyc/documents` | 🅿 | Upload doc metadata (file → signed URL) |
| GET `/api/v1/admin/bookings?status=&city=&date=` | 🅰 | Ops board |
| POST `/api/v1/admin/bookings/{code}/assign` · `/refund` | 🅰 | Manual assign / refund |
| GET/POST `/api/v1/admin/beauticians` · PATCH `/{id}` | 🅰 | Roster, suspend, KYC verdicts |
| GET/POST/PATCH `/api/v1/admin/coupons` | 🅰 | Coupon engine |
| POST `/api/v1/admin/payouts/run` | 🅰 | Trigger settlement batch (also cron) |
| POST `/api/webhooks/razorpay` | signature | Payment lifecycle events |
| POST `/api/webhooks/whatsapp` | signature | Delivery status + inbound replies |
| GET `/api/health` | 🔓 | Liveness (DB ping) |

## 3. Envelope convention

Success (200/201):
```json
{ "ok": true, "data": { … }, "meta": { "requestId": "req_9f2c", "cursor": "…" } }
```
Error (4xx/5xx):
```json
{ "ok": false, "error": { "code": "SLOT_UNAVAILABLE",
    "message": "That 4:00 PM slot was just taken — here are the nearest ones.",
    "details": { "alternatives": ["03:00 PM", "05:00 PM"] } },
  "meta": { "requestId": "req_9f2c" } }
```

| HTTP | Codes |
|---|---|
| 400 | `VALIDATION_ERROR` (details = Zod issue list), `INVALID_COUPON` |
| 401 | `UNAUTHENTICATED`, `OTP_EXPIRED`, `OTP_INVALID` |
| 403 | `FORBIDDEN_ROLE`, `KYC_NOT_VERIFIED` |
| 404 | `NOT_FOUND` |
| 409 | `SLOT_UNAVAILABLE`, `ALREADY_CANCELLED`, `DUPLICATE_REQUEST` |
| 422 | `BOOKING_WINDOW_CLOSED`, `CITY_NOT_LIVE` |
| 429 | `RATE_LIMITED` (+ `Retry-After`) |
| 500 | `INTERNAL` (message generic; details only in Sentry) |

`message` is always customer-displayable (voice rules, doc 03 §9). Server Actions return the same
`code`/`message` pair inside `{ok:false, error}` for parity.

## 4. Booking-critical request/response examples

**POST `/api/v1/bookings`**
```json
// request  (Idempotency-Key: 7f3e-…-a1)
{
  "serviceSlug": "glow-facial", "categorySlug": "skin-facial",
  "packageId": "facial-glow",
  "addOnIds": ["addon-threading"],
  "date": "2026-07-18", "slot": "04:00 PM",
  "beauticianId": "clx…" ,            // or null = auto-allocate
  "addressId": "cla…",
  "couponCode": "GLAMFIRST",
  "paymentMethod": "RAZORPAY"          // RAZORPAY | WALLET | PAY_AFTER_SERVICE
}
// response 201
{ "ok": true, "data": {
    "booking": { "code": "GN2026412857", "status": "PENDING_PAYMENT",
      "scheduledDate": "2026-07-18", "scheduledSlot": "04:00 PM",
      "subtotal": 1398, "visitFee": 0, "discount": 300, "total": 1098 },
    "payment": { "razorpayOrderId": "order_Nx71…", "amount": 109800,
      "currency": "INR", "keyId": "rzp_live_…" } } }
```
Client opens Razorpay checkout with `razorpayOrderId`; confirmation arrives via webhook, and the
app polls `GET /bookings/GN2026412857` (or receives push) until `status: "CONFIRMED"`.

**POST `/api/webhooks/razorpay`** — `payment.captured`:
verify `X-Razorpay-Signature` (HMAC-SHA256 of raw body, doc 06 §6) → look up
`Payment.razorpayOrderId` → mark `CAPTURED` → booking `PENDING_PAYMENT → CONFIRMED` → enqueue
allocation + WhatsApp confirm → respond `200 {received:true}` fast; all work is queued.

**POST `/api/v1/bookings/{code}/cancel`**
```json
// request
{ "reason": "Change of plans" }
// response
{ "ok": true, "data": { "status": "CANCELLED_BY_CUSTOMER",
    "refund": { "amount": 1098, "method": "WALLET", "eta": "instant" },
    "fee": 0 } }
```

## 5. Rate limiting

Upstash Redis sliding window, keyed `ip` (public) or `userId` (authed). Headers:
`X-RateLimit-Remaining`, `Retry-After`.

| Scope | Limit |
|---|---|
| POST /auth/otp/request | 3/phone/10min, 10/IP/hour — the fraud-critical one |
| POST /auth/otp/verify | 5 attempts/code, then invalidate |
| POST /bookings | 10/user/hour |
| POST /coupons/validate | 20/user/hour (stops brute-forcing codes) |
| Catalog GETs | 300/IP/min (CDN-cached anyway) |
| Partner heartbeat | 12/min |

## 6. Idempotency

- **Client → API:** `POST /bookings`, `/gift-cards`, `/memberships` require an
  `Idempotency-Key` header (UUID, generated per checkout attempt). Keys + response hashes stored
  in Redis for 24 h → replay returns the stored 201, mismatched body returns 409 `DUPLICATE_REQUEST`.
- **Webhooks:** Razorpay retries aggressively. Store `event.id` in a `processed_webhook_events`
  set before side-effects; duplicate → 200 no-op. State transitions are guarded
  (`UPDATE … WHERE status = 'PENDING_PAYMENT'`) so out-of-order `payment.captured` after refund
  cannot regress status. `Payment.razorpayPaymentId` is `@unique` — the DB is the last line.
- **Payout batch cron:** batch id = `beauticianId + periodStart` (`@@index` in schema);
  re-running a batch skips existing `Payout` rows.

## 7. Versioning strategy

- Path versioning: `/api/v1`. Bump to `/v2` only on breaking changes (field removal/rename,
  semantic change). Additive fields ship into v1 freely — mobile clients must ignore unknowns.
- Mobile app sends `X-App-Version`; server returns `X-Min-App-Version`. Below minimum →
  426 `UPGRADE_REQUIRED`, app shows force-update screen.
- v1 supported ≥ 12 months after v2 GA; deprecation announced via `Deprecation` +
  `Sunset` headers.
- Webhook paths are never versioned (provider-pinned); payload handling is version-detected via
  provider metadata.
- Server Actions are not versioned — they deploy atomically with the pages that call them.
