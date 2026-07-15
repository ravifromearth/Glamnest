"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/catalog";
import { BRAND } from "@/lib/brand";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Bridal", href: "/services/bridal-makeup" },
  { label: "Packages", href: "/packages" },
  { label: "Membership", href: "/membership" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const signOut = useAuthStore((s) => s.signOut);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink-950 text-center text-xs text-cream-100">
        <div className="container-gn flex h-9 items-center justify-center gap-2">
          <span className="hidden items-center gap-1 sm:inline-flex">
            <MapPin className="size-3 text-gold-400" /> Now live in Patna
          </span>
          <span className="hidden text-cream-100/30 sm:inline">•</span>
          <span>
            Flat <span className="font-semibold text-gold-400">₹300 off</span> your first booking — code{" "}
            <span className="font-semibold tracking-wider text-gold-400">GLAMFIRST</span>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "glass shadow-soft" : "bg-transparent"
        )}
      >
        <div className="container-gn flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-ink-950/5",
                      pathname.startsWith("/services") ? "text-gold-700" : "text-ink-800"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  </Link>
                  {/* Mega menu */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                      servicesOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
                    )}
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-3xl border border-ink-950/8 bg-white p-3 shadow-lift">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/services/${cat.slug}`}
                          className="flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-cream-100"
                        >
                          <span className="text-xl" aria-hidden>{cat.emoji}</span>
                          <span>
                            <span className="block text-sm font-semibold text-ink-950">{cat.name}</span>
                            <span className="mt-0.5 line-clamp-1 block text-xs text-ink-500">{cat.heroLine}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-ink-950/5",
                    pathname.startsWith(link.href) ? "text-gold-700" : "text-ink-800"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-800 transition-colors hover:bg-ink-950/5 xl:inline-flex"
            >
              <Phone className="size-4 text-gold-600" />
              {BRAND.phone}
            </a>
            {hydrated && user ? (
              <>
                <Link href="/account" className="hidden md:block">
                  <Button variant="outline" size="sm" className="h-10 px-5">
                    {user.name.split(" ")[0]}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden h-10 px-3 md:inline-flex"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/signin" className="hidden md:block">
                <Button variant="outline" size="sm" className="h-10 px-5">
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/booking">
              <Button variant="gold" size="sm" className="h-10 px-5">
                Book Now
              </Button>
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-ink-950 transition-colors hover:bg-ink-950/5 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "overflow-hidden border-t border-ink-950/6 bg-white transition-all duration-300 lg:hidden",
            mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 border-t-0"
          )}
        >
          <nav className="container-gn flex flex-col gap-1 py-4" aria-label="Mobile">
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-400">Services</p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-cream-100"
                >
                  <span aria-hidden>{cat.emoji}</span> {cat.shortName}
                </Link>
              ))}
            </div>
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-ink-400">Explore</p>
            {[
              { label: "All Services", href: "/services" },
              { label: "Beauty Packages", href: "/packages" },
              { label: "Membership Plans", href: "/membership" },
              { label: "Gift Cards", href: "/gift-cards" },
              { label: "Blog", href: "/blog" },
              { label: "About Us", href: "/about" },
              { label: "Become a Partner", href: "/become-a-partner" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-cream-100"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 px-1 pb-2">
              {hydrated && user ? (
                <>
                  <Link href="/account" className="flex-1">
                    <Button variant="outline" className="w-full">Account</Button>
                  </Link>
                  <Button variant="ghost" className="flex-1" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/signin" className="flex-1">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
              )}
              <Link href="/booking" className="flex-1">
                <Button variant="gold" className="w-full">Book Now</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
