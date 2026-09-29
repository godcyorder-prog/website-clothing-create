"use client";

import { useState, useRef, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatINR, getProduct, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const SIZE_CHART_IN = [
  { size: "XS", bust: '32"', waist: '26"', length: '51"' },
  { size: "S", bust: '34"', waist: '28"', length: '52"' },
  { size: "M", bust: '36"', waist: '30"', length: '52"' },
  { size: "L", bust: '38"', waist: '32"', length: '53"' },
  { size: "XL", bust: '40"', waist: '34"', length: '53"' },
  { size: "XXL", bust: '42"', waist: '36"', length: '54"' },
];

const SIZE_CHART_CM = [
  { size: "XS", bust: "81 cm", waist: "66 cm", length: "129 cm" },
  { size: "S", bust: "86 cm", waist: "71 cm", length: "132 cm" },
  { size: "M", bust: "91 cm", waist: "76 cm", length: "132 cm" },
  { size: "L", bust: "96 cm", waist: "81 cm", length: "134 cm" },
  { size: "XL", bust: "101 cm", waist: "86 cm", length: "134 cm" },
  { size: "XXL", bust: "106 cm", waist: "91 cm", length: "137 cm" },
];

const ACCORDIONS = [
  {
    id: "acc-1",
    title: "Description & Highlights",
    content: (
      <>
        <p>
          The Aubree Maxi Dress expresses effortless romanticism tailored in pure
          breathability. Designed with an airy relaxed tier silhouette, it cascades with poetic
          fluidity from sunrise gatherings to golden dusk soirées.
        </p>
        <ul className="flex flex-col gap-1.5 pl-4 list-disc font-body-sm text-body-sm">
          <li>Architectural mandarin split collar with mother-of-pearl buttons</li>
          <li>Hand-stamped botanical woodblock accents by master artisans in Bagru</li>
          <li>Concealed side-seam pockets for seamless modern utility</li>
          <li>Tiered ruffled hem with soft gather drape</li>
        </ul>
      </>
    ),
  },
  {
    id: "acc-2",
    title: "Fabric & Craft Care",
    content: (
      <>
        <p>
          Crafted from 100% fine thread-count Mulmul Cotton, renowned for its gossamer lightness
          and featherweight touch against tropical climates.
        </p>
        <div className="bg-surface-container p-3 flex flex-col gap-1 text-on-surface font-body-sm text-body-sm">
          <span className="font-title-md text-title-md">Care Instructions:</span>
          <span>• First wash dry clean recommended to preserve hand-blocked dye richness</span>
          <span>• Subsequent cycles: Gentle hand wash in cold water using mild eco-detergent</span>
          <span>• Dry in shade inside out; warm iron on reverse setting</span>
        </div>
      </>
    ),
  },
  {
    id: "acc-3",
    title: "Size & Fit Guide",
    content: (
      <>
        <p>Engineered with a relaxed ease silhouette allowing natural drape without clinging.</p>
        <div className="grid grid-cols-2 gap-2 font-body-sm text-body-sm">
          <div className="bg-surface p-2.5">
            <span className="text-on-surface font-medium block">Model Height:</span>
            <span>5'8" (173 cm)</span>
          </div>
          <div className="bg-surface p-2.5">
            <span className="text-on-surface font-medium block">Wearing Size:</span>
            <span>Small (S)</span>
          </div>
          <div className="bg-surface p-2.5">
            <span className="text-on-surface font-medium block">Garment Length:</span>
            <span>52 inches (132 cm)</span>
          </div>
          <div className="bg-surface p-2.5">
            <span className="text-on-surface font-medium block">Sleeve Length:</span>
            <span>Elbow flared sleeve</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "acc-4",
    title: "Shipping & Easy Returns",
    content: (
      <>
        <p>
          Every piece is carefully steam-pressed and packaged in biodegradable bespoke parchment
          sleeves.
        </p>
        <ul className="flex flex-col gap-1.5 pl-4 list-disc font-body-sm text-body-sm">
          <li>
            <strong>Dispatches in 24 Hours:</strong> Express courier via verified air delivery
            partners.
          </li>
          <li>
            <strong>Hassle-Free 7-Day Exchange:</strong> Doorstep pickup arranged with instant
            exchange credit or full refund.
          </li>
          <li>
            <strong>Zero Contact Delivery:</strong> Prepaid contactless drops available on request.
          </li>
        </ul>
      </>
    ),
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[1] ?? product?.sizes[0] ?? "S"
  );
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const touchStartX = useRef(0);

  if (!product) notFound();

  const gallery = product.gallery ?? [product.image];
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleBuyNow = () => {
    addToCart(product.id, selectedSize, qty);
    setCartOpen(true);
  };

  return (
    <div className="pt-16 md:pt-20">
      <div className="flex flex-col lg:flex-row w-full">
        {/* LEFT: Gallery */}
        <section className="lg:w-1/2 xl:w-[55%] relative bg-surface-container-low">
          <div
            className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-5rem)] lg:sticky lg:top-20 overflow-hidden"
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0].screenX;
            }}
            onTouchEnd={(e) => {
              const diff = e.changedTouches[0].screenX - touchStartX.current;
              if (diff < -40 && currentSlide < gallery.length - 1)
                setCurrentSlide((s) => s + 1);
              if (diff > 40 && currentSlide > 0) setCurrentSlide((s) => s - 1);
            }}
          >
            <div
              className="flex w-full h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {gallery.map((img, i) => (
                <div key={i} className="w-full h-full flex-shrink-0 relative">
                  <Image
                    src={img}
                    alt={`${product.name} - view ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    quality={90}
                  />
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 bg-primary/75 text-on-primary backdrop-blur-md px-3 py-1 font-label-sm text-label-sm tracking-widest uppercase">
              {currentSlide + 1} / {gallery.length}
            </div>
            <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 shadow-sm flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface">
                <path d="M12 2C6 7 3 10.5 3 14a9 9 0 0 0 18 0c0-3.5-3-7-9-12Z" />
              </svg>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface">
                Pure Handloom Cotton
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="px-margin py-3 flex items-center justify-between bg-surface lg:hidden">
            <div className="flex items-center gap-1.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 transition-all duration-300 ${
                    i === currentSlide ? "w-6 bg-primary" : "w-2 bg-surface-container-highest"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-9 h-11 overflow-hidden transition-opacity ${
                    i === currentSlide ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT: Product Information */}
        <section className="lg:w-1/2 xl:w-[45%] px-margin md:px-margin-tablet lg:px-space-xl py-space-lg lg:py-space-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm tracking-widest uppercase">
            <span>Atelier Edition</span>
            <span>•</span>
            <span>Spring Equinox '25</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <h2 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
                {product.name}
              </h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {product.fabric}
              </span>
            </div>
            <button
              aria-label="Save to Wishlist"
              onClick={() => toggleWishlist(product.id)}
              className="w-10 h-10 flex items-center justify-center bg-surface-container hover:bg-surface-container-high transition-colors shrink-0"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                className={wishlisted ? "text-secondary" : "text-on-surface"}
              >
                <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.3 4.5 6.2 4.5c2.3 0 3.9 1.3 4.8 2.7.9-1.4 2.5-2.7 4.8-2.7 3.9 0 5.8 4.1 4.2 7.2C19.5 16.3 12 21 12 21Z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-price-md text-price-md text-on-surface">{product.rating}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              ({product.reviews} artisan reviews)
            </span>
          </div>

          <div className="bg-surface-container-low p-4 flex flex-col gap-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-[24px] leading-tight font-medium text-on-surface">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-price-md text-price-md text-on-surface-variant line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 uppercase tracking-wider font-semibold">
                  {product.discount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
                <circle cx="7" cy="17" r="1.5" />
                <circle cx="17" cy="17" r="1.5" />
              </svg>
              <p className="font-body-sm text-body-sm">
                Inclusive of all taxes. Free shipping on orders above ₹1999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed-variant font-medium">
              In Stock
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Dispatches within 24 hours
            </span>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-label-lg text-label-lg tracking-widest uppercase text-on-surface">
                  Select Size
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  ({selectedSize} Selected)
                </span>
              </div>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface underline underline-offset-4 flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 17 17 3M7 13l1.5 1.5M11 9l1.5 1.5M15 5l1.5 1.5" />
                </svg>
                Size Guide (In &amp; CM)
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-center font-price-md text-price-md uppercase transition-all ${
                    selectedSize === size
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest p-3 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface-variant">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                True to fit. Model wears Size S (Bust: 34", Height: 5'8")
              </span>
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-surface-container-low px-4 py-2">
              <span className="font-label-lg text-label-lg tracking-widest uppercase text-on-surface">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="font-price-md text-price-md w-6 text-center text-on-surface">
                  {qty}
                </span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => addToCart(product.id, selectedSize, qty)}
                className="w-full h-12 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
                  <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                </svg>
                <span>Add To Bag</span>
              </button>
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={handleBuyNow}
                  className="col-span-4 h-12 bg-surface-container-lowest text-on-surface font-label-lg text-label-lg uppercase tracking-[0.14em] shadow-sm flex items-center justify-center active:scale-[0.99] transition-transform"
                >
                  Buy Now • Express Checkout
                </button>
                <button
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className="col-span-1 h-12 bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={wishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={wishlisted ? "text-secondary" : "text-on-surface"}
                  >
                    <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.3 4.5 6.2 4.5c2.3 0 3.9 1.3 4.8 2.7.9-1.4 2.5-2.7 4.8-2.7 3.9 0 5.8 4.1 4.2 7.2C19.5 16.3 12 21 12 21Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="flex flex-col items-center text-center p-2 bg-surface-container-lowest shadow-sm gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface">
                  <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  Certified Craft
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-surface-container-lowest shadow-sm gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface">
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  7-Day Return
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-surface-container-lowest shadow-sm gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  24h Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="flex flex-col gap-2">
            {ACCORDIONS.map((acc) => (
              <div key={acc.id} className="bg-surface-container-low overflow-hidden">
                <button
                  onClick={() => setOpenAcc(openAcc === acc.id ? null : acc.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-label-lg text-label-lg tracking-widest uppercase text-on-surface">
                    {acc.title}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`text-on-surface transition-transform duration-300 ${
                      openAcc === acc.id ? "rotate-180" : ""
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openAcc === acc.id && (
                  <div className="px-4 pb-4 flex flex-col gap-3 text-on-surface-variant font-body-md text-body-md animate-fade-in">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Complete The Look */}
      <section className="px-margin md:px-margin-tablet lg:px-margin-desktop pt-10 pb-space-xl flex flex-col gap-5">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-on-surface-variant">
            Curated Ensemble
          </span>
          <h3 className="font-serif text-headline-md text-headline-md text-on-surface">
            Complete The Look
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-gutter">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-on-background/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-surface w-full max-w-lg max-h-[85vh] overflow-y-auto p-margin flex flex-col gap-4 shadow-xl animate-slide-up sm:rounded-none">
            <div className="flex items-center justify-between pb-2">
              <div>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant">
                  Precision Measurements
                </span>
                <h3 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Garment Size Chart
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="w-9 h-9 flex items-center justify-center bg-surface-container text-on-surface"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="flex bg-surface-container p-1 self-start gap-1">
              <button
                onClick={() => setUnit("in")}
                className={`px-3 py-1 font-label-sm text-label-sm uppercase ${
                  unit === "in" ? "bg-primary text-on-primary" : "bg-transparent text-on-surface"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 font-label-sm text-label-sm uppercase ${
                  unit === "cm" ? "bg-primary text-on-primary" : "bg-transparent text-on-surface"
                }`}
              >
                Centimeters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Bust</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3">Length</th>
                  </tr>
                </thead>
                <tbody className="bg-surface-container-low text-on-surface">
                  {(unit === "in" ? SIZE_CHART_IN : SIZE_CHART_CM).map((row) => (
                    <tr key={row.size}>
                      <td className="py-2.5 px-3 font-semibold">{row.size}</td>
                      <td className="py-2.5 px-3">{row.bust}</td>
                      <td className="py-2.5 px-3">{row.waist}</td>
                      <td className="py-2.5 px-3">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-surface-container text-on-surface-variant font-body-sm text-body-sm flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M12 11v5" />
              </svg>
              <span>
                Aubree silhouette is crafted with 2-3 inches of relaxed breathing ease around bust
                and waist compared to standard body contours.
              </span>
            </div>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider"
            >
              Got It, Return to Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
