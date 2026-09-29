"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const NAV_LINKS = [
  { label: "NEW ARRIVALS", href: "/collection?filter=new" },
  { label: "SALE", href: "/collection?filter=sale" },
  { label: "ETHNIC WEAR", href: "/collection?category=Ethnic%20Wear" },
  { label: "BEST SELLERS", href: "/collection?filter=bestseller" },
  { label: "DRESSES", href: "/collection?category=Dresses" },
  { label: "CO-ORDS & JUMPSUITS", href: "/collection?category=Co-Ords%20%26%20Jumpsuits" },
  { label: "TOPS & SHIRTS", href: "/collection?category=Tops%20%26%20Shirts" },
  { label: "UNDER ₹1499", href: "/collection?price=under1499" },
  { label: "LUXE", href: "/collection?filter=luxe" },
];

export default function Header() {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl">
        <div className="bg-primary text-on-primary py-1.5 px-4 text-center">
          <p className="font-label-sm text-label-sm tracking-[0.18em] uppercase">
            Free shipping on orders above ₹1999
          </p>
        </div>

        <div className="h-16 md:h-20 px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between border-b border-surface-container-highest">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Open Navigation Menu"
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-on-surface-variant transition-colors lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-serif text-xl tracking-[0.25em] uppercase">
                ZARIA
              </span>
              <span className="font-label-sm text-[8px] tracking-[0.3em] uppercase text-outline hidden sm:inline-block">
                ATELIER
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-label-sm text-[11px] uppercase tracking-[0.12em] text-on-surface-variant hover:text-on-surface transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-1 md:gap-space-sm">
            <button
              aria-label="Search Products"
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-on-surface-variant transition-colors"
              onClick={() => setSearchOpen((s) => !s)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="w-11 h-11 hidden sm:flex items-center justify-center text-on-surface hover:text-on-surface-variant transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
              </svg>
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="w-11 h-11 relative flex items-center justify-center text-on-surface hover:text-on-surface-variant transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.3 4.5 6.2 4.5c2.3 0 3.9 1.3 4.8 2.7.9-1.4 2.5-2.7 4.8-2.7 3.9 0 5.8 4.1 4.2 7.2C19.5 16.3 12 21 12 21Z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
              )}
            </Link>
            <button
              aria-label={`Shopping Cart with ${cartCount} items`}
              className="w-11 h-11 relative flex items-center justify-center text-on-surface hover:text-on-surface-variant transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary text-[10px] font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-b border-surface-container-highest bg-surface-container-lowest animate-fade-in">
            <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-3 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-surface-container-low rounded-lg px-4 py-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silhouettes, fabrics, collections..."
                  className="w-full bg-transparent text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                />
                {query && (
                  <Link
                    href={`/collection?q=${encodeURIComponent(query)}`}
                    className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-secondary whitespace-nowrap"
                  >
                    Search
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-surface-container-lowest shadow-2xl flex flex-col animate-slide-in-right" style={{ animationName: "slide-in-left" }}>
            <div className="h-16 px-margin flex items-center justify-between border-b border-surface-container-highest">
              <span className="font-serif text-headline-md tracking-[0.2em] uppercase">Zaria Atelier</span>
              <button
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-on-surface"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col overflow-y-auto py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-margin py-3.5 font-label-lg text-label-lg uppercase tracking-[0.14em] text-on-surface hover:bg-surface-container-low transition-colors border-b border-surface-container-low"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto px-margin py-4 border-t border-surface-container-highest flex flex-col gap-3">
              <Link href="/account" className="font-label-lg text-label-lg uppercase tracking-[0.14em] text-on-surface-variant">
                Account
              </Link>
              <Link href="/wishlist" className="font-label-lg text-label-lg uppercase tracking-[0.14em] text-on-surface-variant">
                Wishlist ({wishlist.length})
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
