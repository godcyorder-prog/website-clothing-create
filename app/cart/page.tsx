"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatINR, getProduct } from "@/lib/products";

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    subtotal,
    discount,
    total,
    couponApplied,
    applyCoupon,
    removeCoupon,
  } = useStore();
  const [couponInput, setCouponInput] = useState("");

  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-surface">
      <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
        {/* Free Shipping Banner */}
        <div className="bg-surface-container-low p-space-sm flex flex-col gap-2 shadow-sm mb-space-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-tertiary-container">
                <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
                <path d="m9 12 2 2 4-4" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                {subtotal >= 1999 ? "Unlocked! Free Standard Shipping" : "Free Shipping Unlock"}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              {subtotal >= 1999 ? "₹1,999 Target Met" : `${formatINR(Math.max(0, 1999 - subtotal))} away`}
            </span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / 1999) * 100)}%` }}
            />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-space-2xl flex flex-col items-center justify-center gap-space-md text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
              <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            <h2 className="font-serif text-headline-lg text-headline-lg text-on-surface">
              Your shopping bag is empty
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Discover handcrafted silhouettes curated for your wardrobe.
            </p>
            <Link
              href="/collection"
              className="mt-space-sm inline-flex items-center justify-center bg-primary text-on-primary px-space-xl py-3 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
            {/* LEFT: Shopping Bag */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex items-baseline justify-between mb-space-md">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-headline-md text-headline-md tracking-wide text-on-surface">
                    Your Shopping Bag
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                    ({cart.reduce((s, i) => s + i.qty, 0)})
                  </span>
                </div>
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">
                  Atelier Curations
                </span>
              </div>

              <div className="flex flex-col gap-space-sm">
                {cart.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="bg-surface-container-lowest p-space-sm flex gap-space-md shadow-sm relative overflow-hidden"
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        className="w-24 h-32 md:w-28 md:h-36 shrink-0 overflow-hidden bg-surface-container-low relative block"
                      >
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="112px"
                          className="object-cover object-top"
                          quality={85}
                        />
                        {p.discount && (
                          <span className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary font-label-sm text-label-sm px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            {p.discount}
                          </span>
                        )}
                      </Link>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div className="flex flex-col">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-[17px] text-on-surface leading-tight">
                              <Link href={`/product/${p.slug}`}>{p.name}</Link>
                            </h3>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeFromCart(item.productId, item.size)}
                              className="text-on-surface-variant hover:text-error transition-colors p-0.5 shrink-0"
                            >
                              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 6l12 12M18 6 6 18" />
                              </svg>
                            </button>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Size: {item.size} • {p.color}
                          </p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-price-md text-price-md text-on-surface font-semibold">
                              {formatINR(p.price)}
                            </span>
                            {p.originalPrice && (
                              <span className="font-body-sm text-body-sm text-outline line-through">
                                {formatINR(p.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-surface-container rounded p-0.5">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(item.productId, item.size, -1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-lowest rounded transition-colors"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                              </svg>
                            </button>
                            <span className="font-price-md text-price-md px-2.5 text-on-surface select-none min-w-[20px] text-center">
                              {item.qty}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQty(item.productId, item.size, 1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-lowest rounded transition-colors"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant hover:text-error transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon */}
              <div className="mt-space-md bg-surface-container-lowest p-space-sm flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface font-semibold flex items-center gap-1.5">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary">
                      <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6Z" />
                      <path d="M13 5v2m0 4v2m0 4v2" />
                    </svg>
                    Apply Atelier Coupon
                  </span>
                  {couponApplied && (
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                      1 Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-surface-container-low px-3 py-2 flex items-center">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="bg-transparent font-title-md text-[13px] text-on-surface uppercase tracking-wider w-full focus:outline-none placeholder:text-outline font-medium"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (couponInput.trim()) applyCoupon();
                    }}
                    className="bg-primary text-on-primary px-4 py-2 font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container-highest hover:text-primary transition-colors"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-tertiary-container">
                        <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
                        <path d="m9 12 2 2 4-4" fill="none" stroke="#fff" strokeWidth="2" />
                      </svg>
                      <p className="font-body-sm text-body-sm text-on-surface">
                        <span className="font-semibold text-on-surface">ZARIA10</span> applied
                        (10% extra festive savings)
                      </p>
                    </div>
                    <button
                      aria-label="Remove coupon"
                      onClick={removeCoupon}
                      className="text-on-surface-variant hover:text-error text-xs font-semibold uppercase"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-32 bg-surface-container-lowest p-space-md flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-[17px] text-on-surface tracking-wide">
                    Order Summary
                  </h4>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                    Inclusive of Taxes
                  </span>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Bag Total ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span className="font-price-md text-price-md text-on-surface">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-tertiary-container">
                    <span className="flex items-center gap-1">
                      <span>Festive Atelier Discount</span>
                      {couponApplied && (
                        <span className="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 text-on-surface">
                          10%
                        </span>
                      )}
                    </span>
                    <span className="font-price-md text-price-md font-medium">
                      -{formatINR(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Standard Delivery</span>
                    <span
                      className={`font-label-sm text-label-sm uppercase font-semibold ${
                        shipping === 0 ? "text-tertiary-container" : "text-on-surface"
                      }`}
                    >
                      {shipping === 0 ? "FREE" : formatINR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Luxury Artisan Packaging</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase font-medium">
                      Complimentary
                    </span>
                  </div>
                </div>
                <div className="h-px bg-surface-container-high w-full my-1" />
                <div className="flex justify-between items-baseline">
                  <div className="flex flex-col">
                    <span className="font-title-md text-[16px] text-on-surface">Estimated Total</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Inclusive of all duties &amp; GST
                    </span>
                  </div>
                  <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                    {formatINR(total + shipping)}
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm pt-space-sm">
                  <Link
                    href="/checkout"
                    className="w-full h-12 bg-primary text-on-primary flex items-center justify-center font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/collection"
                    className="w-full h-11 bg-surface-container-low text-on-surface flex items-center justify-center font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-surface-container transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-space-md bg-surface-container-low p-space-sm grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface shrink-0">
                    <rect x="4" y="10" width="16" height="10" rx="1" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-medium text-on-surface leading-tight">
                      100% Secure Checkout
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      UPI, Cards, NetBanking
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface shrink-0">
                    <rect x="2" y="6" width="20" height="13" rx="1" />
                    <path d="M2 10h20" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-medium text-on-surface leading-tight">
                      Pay on Delivery
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      Cash / QR on Arrival
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface shrink-0">
                    <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-medium text-on-surface leading-tight">
                      Artisan Handcrafted
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      Verified Master Weavers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface shrink-0">
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-medium text-on-surface leading-tight">
                      Easy Returns
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      7 Days Doorstep Pick-up
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
