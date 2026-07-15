# 02 — User Journeys

> Five personas that cover 90%+ of GlamNest's launch traffic in Patna. Each journey is grounded
> in real routes (see `01-information-architecture.md`), the 8-step booking wizard
> (`src/stores/booking-store.ts`), the `BookingStatus` / `KycStatus` state machines
> (`prisma/schema.prisma`) and the notification stack (WhatsApp / SMS / email).

Emotion scale: 😟 anxious · 😐 neutral · 🙂 positive · 😍 delighted.

---

## Persona A — Priya, 24: first-time customer booking a facial via Instagram ad

Boring Road, Patna. Works at a bank, follows beauty creators, has never let a stranger do a
facial at home. Price-sensitive, hygiene-anxious. Device: Android, Instagram in-app browser.

| Stage | Actions | Touchpoints | Emotion | Pain points | Opportunities |
|---|---|---|---|---|---|
| 1. Discover | Sees reel "Salon-grade facial at home in Patna, from ₹1,299", taps ad | Instagram ad → `/facial-at-home-patna` (UTM-tagged) | 🙂 curious | In-app browser is slow; distrust of ads | Landing page LCP < 2.5s; "Verified professionals" trust strip above fold |
| 2. Evaluate | Scrolls packages, reads hygiene highlights ("single-use sponges"), checks 1,560 reviews on Glow Facial | `/services/skin-facial/glow-facial` | 😟→🙂 | "Will a stranger in my home be safe?" | Hygiene protocol section + beautician verification badge + female-beautician guarantee |
| 3. Configure | Taps Book → wizard pre-filled at package step; picks Glow Ritual ₹1,299, adds threading ₹99 | `/booking?service=skin-facial/glow-facial` (steps 3–4) | 🙂 | Wizard restart would kill conversion | Zustand `persist` keeps cart across the in-app-browser hiccups |
| 4. Commit | Enters address (Boring Road), picks tomorrow 4 PM, sees beautician card (rating 4.8, 900+ jobs), applies `GLAMFIRST` −₹300 | Steps address→schedule→beautician→review; OTP login gate | 😟 at OTP | OTP friction mid-funnel; total anxiety | Coupon auto-suggested for first order; total always visible in sticky bar |
| 5. Pay | Chooses Razorpay UPI, pays ₹1,098 | Razorpay checkout → `/booking/success/GN2026…` | 🙂 | UPI timeout fear | `pay-after` fallback offered if payment fails twice |
| 6. Service day | Gets WhatsApp confirm, then "Anjali is EN_ROUTE" with live status link | WhatsApp, `/account/bookings/{code}` | 😍 | Doesn't want to call to check | Status timeline mirrors `BookingStatusEvent`; beautician photo + masked call |
| 7. After | Rates 5★ + hygiene 5★, gets ₹300 referral nudge | Review prompt (WhatsApp), `/account/referrals` | 😍 | Forgetting the brand | D+21 WhatsApp: "Time for your monthly glow?" rebooking nudge |

**North-star moment:** the beautician card with photo, rating and job count at step 6 of the
wizard — it converts hygiene anxiety into confidence. Never ship a "we'll assign someone" black box.

---

## Persona B — Ananya, 27: bride planning a wedding package 3 months out

Kankarbagh. Wedding in November; researching in August. High spend (₹15–25k), decision by
committee (mother + sister), wants a trial before committing.

| Stage | Actions | Touchpoints | Emotion | Pain points | Opportunities |
|---|---|---|---|---|---|
| 1. Research | Googles "bridal makeup at home patna"; compares 3 vendors; browses HD vs Airbrush explainer | `/bridal-makeup-patna` → `/services/bridal-makeup/*` | 😐 overwhelmed | HD vs airbrush confusion; artist portfolios unseen | FAQ answers HD-vs-airbrush directly; WhatsApp CTA "talk to a bridal expert" |
| 2. Shortlist | Saves Wedding Glow Journey ₹14,999 (6 facials, 3 waxing, keratin, trial); shares link with mother | `/packages/wedding-glow-journey`, WhatsApp share | 🙂 | Family must approve; price justification | Strike-price ₹19,999 anchors value; share card renders OG preview |
| 3. Trial | Books Bridal Trial Session add-on ₹2,499; artist does trial at home; consult call included | Wizard with `addon-trial`; consultation call | 😟→😍 | "What if I hate the look?" | Trial credit: if she books Celebrity Luxe, trial is included — offer upgrade at trial |
| 4. Commit | Books Celebrity Luxe ₹18,999 for wedding date + Wedding Glow Journey starting 3 months out | `/booking` ×2; date picker 90 days ahead | 🙂 | Long-range slot certainty; artist lock-in | "Your artist: locked" confirmation; calendar hold on beautician (`AvailabilitySlot` + booking) |
| 5. Journey | Fortnightly facial visits auto-scheduled; reminders 24h prior | WhatsApp reminders; `/account/bookings` | 🙂 | Rescheduling around family events | Free reschedule ≥24h (see cancellation matrix, doc 07) |
| 6. Wedding day | Artist arrives 4h before muhurat with sealed kit; touch-up artist on call 4h | EN_ROUTE → IN_PROGRESS → COMPLETED | 😍 | Any delay is catastrophic | Ops "wedding-day protocol": admin monitors these bookings on `/admin/dashboard`, backup artist pre-assigned |
| 7. Advocate | Posts photos, tags @glamnest.in; refers 2 cousins (₹300 each) | Instagram, `/account/referrals` | 😍 | — | Bride referral bonus is the cheapest CAC in the segment |

**North-star moment:** the trial. Losing ₹2,499 trials to "included in Luxe" upsell is the
single highest-LTV conversion lever in the catalog.

---

## Persona C — Ritu, 34: repeat customer with a Luxe membership

Patliputra Colony. Books waxing + cleanup monthly, facial before events. Values speed over price;
her benchmark is "faster than ordering groceries".

| Stage | Actions | Touchpoints | Emotion | Pain points | Opportunities |
|---|---|---|---|---|---|
| 1. Trigger | Month-end WhatsApp: "Your free Express Cleanup is waiting" (Luxe perk) | WhatsApp template; push | 🙂 | Forgetting to use perks = churn | Perk-expiry nudges beat generic promos 3:1 |
| 2. Rebook | Opens app → "Book again" on last Monthly Essentials order; 3 taps to review step | `/account` → wizard pre-filled (service, package, address, preferred beautician) | 😍 | Repeating 8 steps would be insulting | "Book again" jumps to `schedule` step with everything else hydrated |
| 3. Slot | Picks same-day 6 PM (member priority slots) | Wizard schedule step | 🙂 | Same-day scarcity | Members see priority slots others don't (Luxe perk) |
| 4. Pay | Wallet + 15% member discount auto-applied; ₹0 friction via saved UPI | Review step: "Luxe −15%" line item | 🙂 | Discount stacking confusion | One clear line per benefit; stacking rules in doc 08 |
| 5. Service | Same beautician (Anjali) — 6th visit | EN_ROUTE tracking | 😍 | New beautician = re-explaining preferences | Allocation scoring boosts `preferred beautician` (doc 07) |
| 6. Retain | Renewal at month 12: annual ₹5,999 offer vs ₹599×12 | `/account/membership`; email | 😐 | Silent renewal resentment | Renewal notice 7 days prior with year-in-review ("you saved ₹4,320") |

**Churn risk:** a single bad substitution (unknown beautician, late arrival) breaks the habit
loop. Substitutions for members require an apology credit trigger (₹100 wallet, automatic).

---

## Persona D — Anjali, 29: beautician partner, application → first payout

8 years salon experience in Kankarbagh, earns ₹12k/month salaried. Owns a scooter and a
smartphone. Wants income upside and schedule control; fears "app companies" and commission traps.

| Stage | Actions | Touchpoints | Emotion | Pain points | Opportunities |
|---|---|---|---|---|---|
| 1. Apply | Sees partner poster QR; fills name/phone/city/expertise/experience | `/partner/apply` → `applyAsPartner` action → `APP{n}` ref | 🙂 hopeful | Distrust of commissions | Earnings calculator on `/partner` ("₹35–60k/month") + "20% flat commission, no hidden fees" |
| 2. KYC | Uploads Aadhaar, PAN, certificates, bank proof; police verification initiated | `/partner/kyc`; `BeauticianDocument`; `KycStatus: PENDING → DOCUMENTS_SUBMITTED → UNDER_REVIEW` | 😟 | Document rejections without reason; long waits | Per-document status + rejection reason; SLA: review in 48h, SMS on each transition |
| 3. Training | 2-day onboarding: hygiene protocol, app usage, service standards; skill certification per service | Training centre + `/partner/training`; `BeauticianSkill.certified` | 🙂 | Unpaid time | Pay a ₹500 completion bonus; certification unlocks higher-value services (bridal) |
| 4. Activation | `KycStatus: VERIFIED`, `BeauticianStatus: ONBOARDING → ACTIVE`; sets weekly availability, service areas | `/partner/calendar` (`AvailabilitySlot`), `/partner/profile` | 😍 | Empty first week kills morale | Guarantee: first-14-days minimum ₹3,000 if online ≥6h/day (`AttendanceRecord`) |
| 5. First job | Push: "New job — Glow Facial, Boring Road, ₹1,299, 4 PM". Accepts, navigates, taps EN_ROUTE → IN_PROGRESS → COMPLETED | `/partner/jobs/{code}`; status buttons write `BookingStatusEvent` | 😟→😍 | Address finding; awkward first entry | In-app map deep link; scripted greeting card in job detail; customer OTP confirms start |
| 6. Rating | Customer rates 5★; rating updates on profile | `/partner/reviews` | 😍 | One bad rating early is devastating | Ratings shown after 5+ jobs; disputes via support |
| 7. First payout | Weekly cycle Mon–Sun; sees gross ₹8,400 − 20% commission + ₹500 incentive = ₹7,220; paid Tuesday, UTR shown | `/partner/earnings`; `Payout` (PENDING → PROCESSING → PAID) | 😍 | Opaque deductions destroy trust | Line-item payout statement; UTR number surfaced; payday WhatsApp |

**North-star moment:** first payout landing on time with a legible statement. Partner NPS is set
in week one; late or opaque payouts are the #1 cause of partner churn in this category.

---

## Persona E — Vikram, 31: support admin resolving a bad-review escalation

SUPPORT role on `/admin`. A customer rated 1★ with "beautician arrived 40 min late, wax burn on
arm" — auto-flagged URGENT.

| Stage | Actions | Touchpoints | Emotion | Pain points | Opportunities |
|---|---|---|---|---|---|
| 1. Detect | 1★ + injury keyword auto-creates URGENT ticket, review held (`isPublished: false`) | `/admin/support` queue (sorted by `TicketPriority`) | 😐 | Missing an injury report is existential | Keyword triggers ("burn", "cut", "injury") auto-escalate to URGENT + Slack alert |
| 2. Investigate | Opens booking timeline: EN_ROUTE logged 35 min after slot; reads beautician's note; checks partner's history (first complaint in 212 jobs) | `/admin/bookings/{code}` (`BookingStatusEvent` audit trail), `/admin/beauticians/{id}` | 😐 | Fragmented context | Single booking view stitches timeline + payment + review + partner record |
| 3. Contact | Calls customer within 2h SLA; apologises; verifies burn photo via WhatsApp | Masked call; ticket thread (`TicketMessage`) | 😟 | He-said-she-said | Photo evidence attached to ticket; empathy script for injuries |
| 4. Resolve | Full refund ₹1,199 (`REFUND_INITIATED` → wallet, source `BOOKING_REFUND`) + ₹500 goodwill credit + free re-service offer | Refund action on booking; `WalletTransaction` | 🙂 | Refund authority limits | SUPPORT can refund ≤ ₹2,000; above that requires ADMIN approval (doc 06 matrix) |
| 5. Partner action | Logs coaching note; late-arrival strike 1 of 3; hygiene retraining assigned; no suspension (clean history) | `/admin/beauticians/{id}`; training assignment | 😐 | Over-punishing good partners | Graduated response: coach → retrain → suspend (`SUSPENDED`) → deactivate |
| 6. Close loop | Publishes review with `adminReply` describing the fix; ticket → RESOLVED; customer gets summary | `/admin/reviews`; ticket status | 🙂 | Hidden bad reviews destroy trust | Public, specific admin replies convert complaints into trust signals |
| 7. Learn | Tags root cause "traffic buffer too small, Kankarbagh→Boring Road"; feeds travel-buffer tuning | Ops retro; slot algorithm config (doc 07) | 🙂 | Anecdotes never reaching product | Monthly root-cause rollup from ticket tags |

**SLA table (support):**

| Severity | First response | Resolution target | Authority |
|---|---|---|---|
| URGENT (injury/safety) | 2 h | 24 h | Refund ≤₹2,000; escalate to ADMIN beyond |
| HIGH (no-show, payment) | 4 h | 48 h | Refund ≤₹2,000 |
| MEDIUM (quality) | 12 h | 72 h | Credit ≤₹500 |
| LOW (general) | 24 h | 5 days | — |
