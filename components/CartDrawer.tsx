"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatINR, getProduct } from "@/lib/products";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    subtotal,
    discount,
    total,
  } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-surface-container-lowest shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-space-lg py-space-md border-b border-surface-container-highest">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-headline-md text-on-surface">Shopping Bag</h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              ({cart.reduce((s, i) => s + i.qty, 0)})
            </span>
          </div>
          <button
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors"
            onClick={() => setCartOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-space-md px-space-lg text-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
              <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            <p className="font-serif text-headline-md text-on-surface">
              Your shopping bag is empty
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[240px]">
              Discover handcrafted silhouettes curated for your wardrobe.
            </p>
            <Link
              href="/collection"
              onClick={() => setCartOpen(false)}
              className="mt-space-sm inline-flex items-center justify-center bg-primary text-on-primary px-space-xl py-3 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-space-lg py-space-md flex flex-col gap-space-md">
              {cart.map((item) => {
                const p = getProduct(item.productId);
                if (!p) return null;
                return (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-space-md bg-surface-container-lowest p-space-sm shadow-sm"
                  >
                    <div className="w-20 h-24 shrink-0 overflow-hidden bg-surface-container-low relative">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                        quality={85}
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="font-serif text-[15px] text-on-surface leading-tight truncate pr-1">
                          {p.name}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Size: {item.size}
                        </p>
                        <span className="font-price-md text-price-md text-on-surface font-semibold">
                          {formatINR(p.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center bg-surface-container rounded p-0.5">
                          <button
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-lowest rounded transition-colors"
                            onClick={() => updateQty(item.productId, item.size, -1)}
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
                            className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-lowest rounded transition-colors"
                            onClick={() => updateQty(item.productId, item.size, 1)}
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

            <div className="border-t border-surface-container-highest px-space-lg py-space-md flex flex-col gap-space-sm bg-surface-container-lowest">
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-price-md text-price-md text-on-surface">
                  {formatINR(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-body-md text-body-md text-tertiary-container">
                  <span>Discount (ZARIA10)</span>
                  <span className="font-price-md text-price-md font-medium">
                    -{formatINR(discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-space-sm border-t border-surface-container-highest">
                <span className="font-title-md text-title-md text-on-surface">Total</span>
                <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                  {formatINR(total)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm pt-space-sm">
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="h-11 flex items-center justify-center bg-surface-container-low text-on-surface font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-surface-container transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="h-11 flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
