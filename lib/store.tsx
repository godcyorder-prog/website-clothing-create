"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProduct, type Product } from "./products";

export type CartItem = {
  productId: string;
  size: string;
  qty: number;
};

type ToastData = { id: number; message: string };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  toasts: ToastData[];
  addToCart: (productId: string, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, delta: number) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setCartOpen: (open: boolean) => void;
  showToast: (message: string) => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  couponApplied: boolean;
  applyCoupon: () => void;
  removeCoupon: () => void;
  total: number;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "zaria_cart";
const WISHLIST_KEY = "zaria_wishlist";
const COUPON_KEY = "zaria_coupon";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      const savedCoupon = localStorage.getItem(COUPON_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCoupon) setCouponApplied(savedCoupon === "true");
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(COUPON_KEY, JSON.stringify(couponApplied));
  }, [couponApplied, hydrated]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (productId: string, size: string, qty: number = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.size === size
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, qty: i.qty + qty }
              : i
          );
        }
        return [...prev, { productId, size, qty }];
      });
      const p = getProduct(productId);
      showToast(
        `${p?.name ?? "Item"} (Size ${size} × ${qty}) added to your shopping bag`
      );
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQty = useCallback(
    (productId: string, size: string, delta: number) => {
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, qty: Math.max(1, i.qty + delta) }
            : i
        )
      );
    },
    []
  );

  const setQty = useCallback((productId: string, size: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, qty: Math.max(1, qty) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponApplied(false);
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const p = getProduct(productId);
        showToast(
          exists
            ? `${p?.name ?? "Item"} removed from wishlist`
            : `${p?.name ?? "Item"} saved to your wishlist`
        );
        return exists
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const p = getProduct(item.productId);
        return sum + (p ? p.price * item.qty : 0);
      }, 0),
    [cart]
  );

  const discount = useMemo(
    () => (couponApplied ? Math.round(subtotal * 0.1) : 0),
    [couponApplied, subtotal]
  );

  const total = Math.max(0, subtotal - discount);

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  );

  const applyCoupon = useCallback(() => {
    setCouponApplied(true);
    showToast("ZARIA10 festive discount activated");
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setCouponApplied(false);
    showToast("Coupon code removed");
  }, [showToast]);

  const value: StoreState = {
    cart,
    wishlist,
    cartOpen,
    toasts,
    addToCart,
    removeFromCart,
    updateQty,
    setQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    setCartOpen,
    showToast,
    cartCount,
    subtotal,
    discount,
    couponApplied,
    applyCoupon,
    removeCoupon,
    total,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
