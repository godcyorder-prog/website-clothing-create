"use client";

import { useState } from "react";
import Image from "next/image";
import { AVATAR_URL } from "@/lib/products";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-surface">
      {/* Editorial Warm Header Banner */}
      <div className="relative w-full bg-surface-container-low px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg overflow-hidden">
        <div className="flex flex-col gap-space-xs relative z-10 max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-space-xs text-on-surface-variant">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Sanctuary of Craft
            </span>
          </div>
          <h1 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
            The Atelier Circle
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
            Welcome to the Zaria Circle. Enjoy early access to limited artisanal drops, private
            weaver showcases, and bespoke personalized drape consultations.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none text-on-surface">
          <svg fill="none" height="180" stroke="currentColor" strokeWidth="0.75" viewBox="0 0 100 100" width="180">
            <circle cx="50" cy="50" r="46" />
            <circle cx="50" cy="50" r="34" />
            <path d="M50 4 50 96 M4 50 L96 50 M17.5 17.5 L82.5 82.5 M17.5 82.5 L82.5 17.5" />
          </svg>
        </div>
      </div>

      <div className="px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md flex flex-col gap-space-lg max-w-md mx-auto w-full">
        {/* Profile */}
        <div className="flex items-center gap-space-md justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover shadow-sm"
            src={AVATAR_URL}
          />
          <div>
            <p className="font-serif text-headline-md text-headline-md text-on-surface">
              Ananya Sharma
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Atelier Circle Member
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="w-full bg-surface-container p-1 flex">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2.5 text-center font-label-lg text-label-lg uppercase tracking-widest transition-all ${
              tab === "login"
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2.5 text-center font-label-lg text-label-lg uppercase tracking-widest transition-all ${
              tab === "register"
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md">
          {tab === "login" ? (
            <form className="flex flex-col gap-space-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Email or 10-Digit Mobile Number
                </label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5 focus-within:bg-surface-container transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline mr-2">
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <input
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="e.g. ananya@atelier.com or 9876543210"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Password
                  </label>
                  <button className="font-label-sm text-label-sm uppercase tracking-wider text-secondary hover:underline" type="button">
                    Forgot?
                  </button>
                </div>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5 focus-within:bg-surface-container transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-outline mr-2">
                    <rect x="4" y="10" width="16" height="10" rx="1" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  <input
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="Enter your confidential passphrase"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="text-outline hover:text-on-surface transition-colors p-1"
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Keep me signed in on this device
                  </span>
                </label>
              </div>
              <button
                className="w-full h-12 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-highest hover:text-primary transition-all active:scale-[0.99]"
                type="submit"
              >
                <span>Sign In to Sanctuary</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-space-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Full Legal Name
                </label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5">
                  <input
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="e.g. Radhika Singhania"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Email Address
                </label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5">
                  <input
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="name@domain.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Create Password
                </label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5">
                  <input
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="Minimum 8 characters"
                    type="password"
                  />
                </div>
              </div>
              <button
                className="w-full h-12 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-highest hover:text-primary transition-all active:scale-[0.99]"
                type="submit"
              >
                <span>Join the Atelier Circle</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
