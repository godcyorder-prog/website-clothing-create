"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const products = wishlist
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-surface">
      <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
        <div className="mb-space-lg">
          <h1 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
            Your Wishlist
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-space-2xl flex flex-col items-center justify-center gap-space-md text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
              <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.3 4.5 6.2 4.5c2.3 0 3.9 1.3 4.8 2.7.9-1.4 2.5-2.7 4.8-2.7 3.9 0 5.8 4.1 4.2 7.2C19.5 16.3 12 21 12 21Z" />
            </svg>
            <h2 className="font-serif text-headline-md text-headline-md text-on-surface">
              Your wishlist is empty
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Save your favorite pieces to revisit them later.
            </p>
            <Link
              href="/collection"
              className="mt-space-sm inline-flex items-center justify-center bg-primary text-on-primary px-space-xl py-3 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-gutter md:gap-y-gutter-desktop lg:gap-x-gutter-desktop">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
