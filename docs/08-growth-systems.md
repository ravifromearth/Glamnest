# 08 — Growth Systems

> Subscriptions, referrals, loyalty, coupons, gift cards — the compounding layer on top of the
> booking engine. Plans and prices are the live `MEMBERSHIP_PLANS` in `src/lib/catalog.ts`;
> coupons mirror `COUPONS` in `src/stores/booking-store.ts`; ledger mechanics use `Wallet` /
> `WalletTransaction` / `Membership` / `Coupon` / `GiftCard` from the schema.

## 1. Subscriptions (memberships)

| | Glow | Luxe (hero) | Royale |
|---|---|---|---|
| Price | ₹299/mo · ₹2,999/yr | ₹599/mo · ₹5,999/yr | ₹999/mo · ₹9,999/yr |
| Discount | 10% all services | 15% all services | 20% all services |
| Monthly freebie | Free threading per booking (~₹99 cost) | 1 Express Cleanup (retail ₹699, COGS ≈ ₹350) | 1 Glow Facial (retail ₹1,299, COGS ≈ ₹600) |
| Extras | Priority support | ₹199 add-on/booking, priority + same-day slots, RM | Spa upgrade 2×/yr, celebrity priority, birthday session |
| **Expected monthly redemption cost** (freebie COGS × 75% redemption + discount on avg spend) | ~₹74 + 10%·₹1,500 = **~₹224** | ~₹262 + ₹149 + 15%·₹2,500 = **~₹786** | ~₹450 + 20%·₹4,000 = **~₹1,250** |
| **Contribution vs fee** | +₹75/mo + frequency lift | −₹187/mo direct, paid back by +1.4× frequency | −₹251/mo direct, paid back by ARPU + retention |
| Breakeven usage | Member must spend ≥ ₹1,000/mo for us to prefer non-member pricing parity — Glow is margin-safe at any usage | Fee covers freebie if member books ≥ 1×/mo (discount is the CAC we'd pay anyway for the incremental booking) | Justified at ≥ 2 bookings/mo (Royale target: bridal-adjacent heavy users) |

Doctrine: memberships are **retention products, not profit centers** — target ≥ 70% of members
booking ≥ 1×/month; a member's discount ≈ the promo cost of re-acquiring a lapsed customer.
Guardrails: freebies don't roll over (breakage ~25% priced in above); pause allowed 1 mo/yr
(`MembershipStatus.PAUSED`); discount applies to services only, never visit fee or gift cards;
annual plans (2 months free) pushed at month 3 of monthly tenure.

## 2. Referrals — Give ₹300 / Get ₹300

Attribution flow (`User.referralCode`, `referredById`, wallet source `REFERRAL_BONUS`):

```
Ritu shares glamnest.in/r/{referralCode}  (WA share card from /account/referrals)
  → visitor lands, code stored in cookie (30d) + prefilled at OTP signup
  → new User created with referredById = Ritu.id
  → friend's ₹300: auto-applied as first-booking discount (min order ₹999)
  → Ritu's ₹300: credited ONLY when friend's first booking reaches COMPLETED
    (not CONFIRMED — kills self-referral refund farming)
```

Fraud controls:

| Vector | Control |
|---|---|
| Self-referral (2nd SIM) | Device fingerprint + address match: same address/device as referrer → bonus withheld, flagged |
| Booking → cancel farming | Reward on COMPLETED only; clawback ledger entry (`ADJUSTMENT`) if refunded within 7 days |
| Bulk fake accounts | OTP rate limits (doc 05 §5); referrer cap 10 rewarded referrals/month, ₹9,000/yr (also keeps it below TDS-on-benefits thresholds — finance review) |
| Wallet cash-out | Referral credits are non-withdrawable, spend-only, 90-day expiry, max 50% of any order payable by referral credit |
| Ring detection | Weekly job: graph clusters of referrals sharing device/address/payment fingerprint → freeze + manual review |

Economics: ₹600 total cost/activated customer vs blended paid CAC ~₹450–700 in Patna — referral
pays for itself if referred users' 90-day repeat rate ≥ 35% (they historically over-index).

## 3. Loyalty — Glow Points

Earn (1 pt ≈ ₹0.25 redemption value; liability accrued at redemption value × expected redemption):

| Action | Points |
|---|---|
| ₹100 spent (post-discount) | 10 pts |
| Review with photo | 50 pts |
| Referral (on top of ₹300) | 100 pts |
| Birthday month booking | 2× earn |
| Streak: 3 consecutive months with a booking | 300 pts |

Burn: 400 pts = ₹100 off (min order ₹999) · 1,000 pts = free threading+upper lip ·
2,000 pts = free Express Cleanup · 4,000 pts = free Classic Mani-Pedi. Points expire 12 months
rolling; burn allowed alongside membership discount but not alongside coupons (§4).

Tiers (rolling 12-month spend):

| Tier | Spend | Perks |
|---|---|---|
| Blush | ₹0+ | Base earn |
| Gold | ₹10,000+ | 1.25× earn, early slot access, priority support |
| Royale | ₹25,000+ | 1.5× earn, free visit fees, annual spa upgrade, RM |

## 4. Coupons engine

Types (schema `Coupon`): `FLAT` (e.g. GLAMFIRST ₹300, PATNA100 ₹100) and `PERCENT` with
`maxDiscount` cap. Targeting flags: `firstOrderOnly`, `minOrderValue`, `usageLimit`,
`perUserLimit`, validity window, `isActive` kill switch. Launch set mirrors the store:
`GLAMFIRST` (₹300, first order), `PATNA100` (₹100 launch), `GLOWUP15` (₹250, min ₹1,500).

**Stacking rules (strict, enforced server-side in the §4 pricing pipeline of doc 07):**

| Combination | Allowed? |
|---|---|
| Coupon + membership discount | ❌ — best-of-two auto-applied ("You're already saving more with Luxe") |
| Coupon + coupon | ❌ — one coupon per booking (`Booking.couponId` is singular by design) |
| Coupon + Glow Points burn | ❌ |
| Membership discount + points burn | ✅ |
| Anything + gift-card/wallet payment | ✅ — wallet is tender, not discount |
| Referral credit + first-order coupon | ❌ — best-of; both are acquisition subsidies |

Hygiene: every code has an owner, budget, and end date at creation; `CouponUsage` audit powers
per-code CAC reporting; codes are never valid on visit fees or gift-card purchases.

## 5. Gift cards

Product: ₹500–₹10,000, WhatsApp/email delivery with message, 12-month expiry (`GiftCard.expiresAt`),
partial redemption via `balance`, redeems into wallet (`TransactionSource.GIFT_CARD`).

**Liability accounting note:** gift-card sales are **not revenue** — they are a liability
(deferred revenue) at sale. Revenue recognizes on redemption against services. Breakage
(industry 6–10%) may be recognized proportionally to redemption pattern per Ind AS 115 — finance
sign-off required before recognizing any breakage. The wallet ledger (`balanceAfter`) must
reconcile to the gift-card liability account monthly; expired-card value moves to breakage income
only per policy, never silently.

## 6. CAC / LTV framing — Patna launch

Assumptions (validate monthly): AOV ₹1,400 · gross margin after partner payout ≈ 30%
(20% commission + visit fees + product margin − PG 2%) · monthly active repeat rate 45%.

| Channel | CAC est. | Note |
|---|---|---|
| Instagram/Meta (persona A) | ₹500–700 | Creative = hygiene + before/after; landing on `{intent}-patna` pages |
| Google local intent | ₹350–500 | Bottom-funnel, capped volume in Patna |
| Referral | ₹600 all-in | Best retention cohort |
| Local SEO (doc 09) | →₹0 marginal | 6–12 mo payback, the moat |
| Society activations/QR | ₹200–350 | Patna-specific: RWA tie-ups, salons-day events |

LTV (12-mo, contribution): casual (3 bookings) ≈ ₹1,260 · regular (10) ≈ ₹4,200 · member
(16 + fee) ≈ ₹7,900. **Rule: blended CAC must stay < ⅓ of 12-month LTV**; at blended ₹550 vs
blended LTV ~₹2,800 the launch math holds — the entire growth job is moving casuals → regulars
(first→second booking within 30 days is the metric that decides the company).
