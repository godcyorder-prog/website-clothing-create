"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatINR, getProduct } from "@/lib/products";
import {
  createWhatsAppOrderUrl,
  generateOrderId,
  generateWhatsAppOrderMessage,
} from "@/lib/whatsapp";

const STATES = [
  "Delhi (NCT)",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "West Bengal",
  "Uttar Pradesh",
  "Rajasthan",
  "Gujarat",
  "Kerala",
];

const inputCls =
  "w-full bg-surface-container-low px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors";
const labelCls =
  "block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1";

export default function CheckoutPage() {
  const { cart, subtotal, discount, total } = useStore();
  const [whatsAppFallbackUrl, setWhatsAppFallbackUrl] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [form, setForm] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Delhi (NCT)",
    pin: "",
  });

  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
  const grandTotal = total + shipping;

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (cart.length === 0) {
      setCheckoutError("Your shopping bag is empty.");
      return;
    }

    try {
      const message = generateWhatsAppOrderMessage({
        orderId: generateOrderId(),
        cart,
        customer: {
          name: form.fullName,
          whatsapp: form.phone,
          email: form.email,
          address: form.address,
          apartment: form.apartment,
          city: form.city,
          state: form.state,
          pin: form.pin,
        },
        subtotal,
        discount,
        shipping,
        total: grandTotal,
      });
      const whatsappUrl = createWhatsAppOrderUrl(message);
      const whatsappWindow = window.open(whatsappUrl, "_blank");

      if (whatsappWindow) {
        whatsappWindow.opener = null;
        setWhatsAppFallbackUrl("");
      } else {
        setWhatsAppFallbackUrl(whatsappUrl);
      }
      setCheckoutError("");
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Unable to open WhatsApp checkout."
      );
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-surface">
        <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-space-2xl flex flex-col items-center justify-center gap-space-md text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-outline-variant">
            <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" />
          </svg>
          <h2 className="font-serif text-headline-lg text-headline-lg text-on-surface">
            Your shopping bag is empty
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
            Add items to your bag before proceeding to checkout.
          </p>
          <Link
            href="/collection"
            className="mt-space-sm inline-flex items-center justify-center bg-primary text-on-primary px-space-xl py-3 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-surface">
      <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
        <div className="mb-space-lg">
          <h1 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
            Secure Checkout
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Review your order and send it to Zaria Atelier on WhatsApp. No online payment is collected here.
          </p>
        </div>

        <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-xl">
            {/* CONTACT INFORMATION */}
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center gap-space-md">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">
                  1
                </span>
                <h2 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Contact Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div>
                  <label className={labelCls} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="name@domain.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="phone">WhatsApp Number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 98765 43210"
                    className={inputCls}
                  />
                </div>
              </div>
            </section>

            {/* SHIPPING ADDRESS */}
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center gap-space-md">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">
                  2
                </span>
                <h2 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Shipping Address
                </h2>
              </div>
              <div className="flex flex-col gap-space-md">
                <div>
                  <label className={labelCls} htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={update("fullName")}
                    placeholder="Recipient's full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={update("address")}
                    placeholder="House / Flat No., Road / Street"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="apartment">Apartment / Suite</label>
                  <input
                    id="apartment"
                    type="text"
                    value={form.apartment}
                    onChange={update("apartment")}
                    placeholder="Apartment, suite, unit (optional)"
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                  <div className="col-span-2">
                    <label className={labelCls} htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={update("city")}
                      placeholder="City"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="state">State</label>
                    <select
                      id="state"
                      value={form.state}
                      onChange={update("state")}
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="pin">PIN Code</label>
                    <input
                      id="pin"
                      type="text"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={form.pin}
                      onChange={update("pin")}
                      placeholder="6-digit PIN"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-space-md">
              <div className="flex items-center gap-space-md">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">
                  3
                </span>
                <h2 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Send Order on WhatsApp
                </h2>
              </div>
              <p className="bg-surface-container-low p-space-md font-body-sm text-body-sm text-on-surface-variant">
                Your order details will open in WhatsApp for you to review and send. Payment is arranged directly with the atelier.
              </p>
            </section>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md">
                <h3 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-space-md">
                  {cart.map((item) => {
                    const p = getProduct(item.productId);
                    if (!p) return null;
                    return (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-space-md"
                      >
                        <div className="w-16 h-20 shrink-0 overflow-hidden bg-surface-container-low relative">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="64px"
                            className="object-cover object-top"
                            quality={85}
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <h4 className="font-serif text-[15px] text-on-surface leading-tight truncate">
                              {p.name}
                            </h4>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                              Size: {item.size} • Qty: {item.qty}
                            </p>
                          </div>
                          <span className="font-price-md text-price-md text-on-surface font-semibold">
                            {formatINR(p.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-px bg-surface-container-high w-full" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-price-md text-price-md text-on-surface">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-tertiary-container">
                    <span>Discount</span>
                    <span className="font-price-md text-price-md font-medium">
                      -{formatINR(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Shipping</span>
                    <span
                      className={`font-label-sm text-label-sm uppercase font-semibold ${
                        shipping === 0 ? "text-tertiary-container" : "text-on-surface"
                      }`}
                    >
                      {shipping === 0 ? "FREE" : formatINR(shipping)}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-surface-container-high w-full" />
                <div className="flex justify-between items-baseline">
                  <span className="font-title-md text-title-md text-on-surface">Total</span>
                  <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 4a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
                </svg>
                <span>Proceed to Payment</span>
              </button>

              {checkoutError && (
                <p role="alert" className="font-body-sm text-error">
                  {checkoutError}
                </p>
              )}

              {whatsAppFallbackUrl && (
                <a
                  href={whatsAppFallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 border border-primary text-on-surface flex items-center justify-center font-label-lg text-label-lg uppercase tracking-[0.14em]"
                >
                  Open WhatsApp
                </a>
              )}

              <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="10" width="16" height="10" rx="1" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <span className="font-body-sm text-body-sm">
                  No card, CVV, OTP, UPI PIN, or banking information is collected.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
