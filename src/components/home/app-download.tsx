import { Apple, Bell, CalendarCheck, Play, Wallet } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function AppDownload() {
  return (
    <section className="section-gn">
      <div className="container-gn">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 text-cream-50">
          {/* Glows */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-8%] top-[-30%] size-96 rounded-full bg-gold-500/15 blur-[100px]" />
            <div className="absolute bottom-[-40%] left-[10%] size-80 rounded-full bg-blush-500/10 blur-[90px]" />
          </div>

          <div className="relative grid items-center gap-10 p-8 md:p-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
                The GlamNest App
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Beauty In Your Pocket,
                <br />
                <span className="text-gold-gradient">Bookings In Two Taps</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/65">
                Track your beautician live, manage your wallet and rewards, and rebook your
                favourite professional — all from the {BRAND.name} app.
              </p>

              <div className="mt-7 grid max-w-md grid-cols-3 gap-3 text-center">
                {[
                  { icon: CalendarCheck, label: "1-tap rebooking" },
                  { icon: Bell, label: "Live arrival alerts" },
                  { icon: Wallet, label: "Wallet & rewards" },
                ].map((f) => (
                  <div key={f.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                    <f.icon className="mx-auto size-5 text-gold-400" />
                    <p className="mt-2 text-[11px] leading-tight text-cream-100/70">{f.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#"
                  aria-label="Download on the App Store (coming soon)"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 transition-all hover:border-gold-500/50 hover:bg-white/10"
                >
                  <Apple className="size-6 text-cream-50" />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] uppercase tracking-wide text-cream-100/55">Coming soon on</span>
                    <span className="block text-sm font-semibold">App Store</span>
                  </span>
                </a>
                <a
                  href="#"
                  aria-label="Get it on Google Play (coming soon)"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 transition-all hover:border-gold-500/50 hover:bg-white/10"
                >
                  <Play className="size-6 text-cream-50" />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] uppercase tracking-wide text-cream-100/55">Coming soon on</span>
                    <span className="block text-sm font-semibold">Google Play</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Phone mock — pure CSS */}
            <div className="relative mx-auto hidden w-56 lg:block" aria-hidden>
              <div className="rounded-[2.2rem] border border-white/15 bg-ink-900 p-2.5 shadow-lift">
                <div className="overflow-hidden rounded-[1.7rem] bg-cream-50">
                  <div className="bg-ink-950 px-4 pb-3 pt-4">
                    <p className="font-display text-xs font-bold text-cream-50">
                      Glam<span className="text-gold-400">Nest</span>
                    </p>
                    <p className="mt-1 text-[9px] text-cream-100/50">Good morning, Ananya ✨</p>
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="rounded-xl bg-gradient-to-r from-gold-500/25 to-blush-100 p-2.5">
                      <p className="text-[9px] font-semibold text-ink-950">₹300 off first booking</p>
                      <p className="text-[8px] text-ink-500">Code GLAMFIRST</p>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {["✨", "💇‍♀️", "💅", "🌿"].map((e) => (
                        <div key={e} className="rounded-lg bg-white p-1.5 text-sm shadow-soft">{e}</div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-white p-2.5 shadow-soft">
                      <p className="text-[9px] font-semibold text-ink-950">Sunita is on the way</p>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-950/10">
                        <div className="h-full w-2/3 bg-gold-500" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-2.5 shadow-soft">
                      <p className="text-[9px] font-semibold text-ink-950">Glow Points</p>
                      <p className="font-display text-xs font-bold text-gold-600">320 ✦</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
