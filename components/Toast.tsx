"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toasts } = useStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex flex-col gap-2 items-center pointer-events-none px-4 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-primary text-on-primary px-space-lg py-3 shadow-xl flex items-center gap-2 animate-toast-in w-full justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="font-body-sm text-body-sm tracking-wide text-center">
            {toast.message}
          </span>
        </div>
      ))}
    </div>
  );
}
