"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

const SORT_OPTIONS = [
  "Featured",
  "Best Selling",
  "Price: Low to High",
  "Price: High to Low",
  "New Arrivals",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const FABRICS = ["Pure Linen", "Chanderi Silk", "Kota Doria", "Organza", "Mulmul Cotton"];
const PRICE_BANDS = ["Under ₹1,499", "₹1,500 - ₹3,500", "Above ₹3,500"];

function CollectionInner() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [readyToShip, setReadyToShip] = useState(false);

  useEffect(() => {
    const filter = searchParams.get("filter");
    const category = searchParams.get("category");
    const price = searchParams.get("price");
    if (filter === "new") {
      setSort("New Arrivals");
    } else if (filter === "sale") {
      setSelectedPrice("Under ₹1,499");
    } else if (filter === "bestseller") {
      setSort("Best Selling");
    } else if (filter === "luxe") {
      setSelectedFabrics(["Pure Linen"]);
    }
    if (category) {
      setSelectedFabrics((prev) =>
        prev.includes(category) ? prev : [...prev, category]
      );
    }
    if (price === "under1499") {
      setSelectedPrice("Under ₹1,499");
    }
  }, [searchParams]);

  const activeFilterCount =
    (selectedSize ? 1 : 0) +
    selectedFabrics.length +
    (selectedPrice ? 1 : 0) +
    (readyToShip ? 1 : 0);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedSize) {
      list = list.filter((p) => p.sizes.includes(selectedSize));
    }
    if (selectedFabrics.length > 0) {
      list = list.filter((p) =>
        selectedFabrics.some(
          (f) =>
            p.fabric.toLowerCase().includes(f.toLowerCase()) ||
            p.category.toLowerCase().includes(f.toLowerCase())
        )
      );
    }
    if (selectedPrice) {
      if (selectedPrice === "Under ₹1,499") list = list.filter((p) => p.price < 1499);
      else if (selectedPrice === "₹1,500 - ₹3,500")
        list = list.filter((p) => p.price >= 1500 && p.price <= 3500);
      else list = list.filter((p) => p.price > 3500);
    }
    switch (sort) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "New Arrivals":
        list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "Best Selling":
        list.sort((a, b) => Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false));
        break;
      default:
        break;
    }
    return list;
  }, [selectedSize, selectedFabrics, selectedPrice, readyToShip, sort]);

  const resetFilters = () => {
    setSelectedSize(null);
    setSelectedFabrics([]);
    setSelectedPrice(null);
    setReadyToShip(false);
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* Editorial Collection Header */}
      <section className="px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-md pb-space-sm bg-surface">
        <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
            Atelier
          </span>
          <span className="text-outline text-xs">/</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">
            Couture Dresses
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
            Dresses for Women
          </h1>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline whitespace-nowrap">
            {filtered.length} Items
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed max-w-md">
          Explore our collection of contemporary dresses crafted with distinctive prints,
          silhouettes and effortless feminine styles.
        </p>
        <div className="mt-space-sm py-2 px-space-sm bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface">
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
            </svg>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">
              Spring Solstice Capsule
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
            Handloom Edit
          </span>
        </div>
      </section>

      {/* Shop by Size Pill Carousel */}
      <section className="py-space-sm bg-surface">
        <div className="px-margin md:px-margin-tablet lg:px-margin-desktop mb-1.5 flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-medium">
            Select Silhouette Size
          </span>
          <span className="font-label-sm text-label-sm text-outline">Standard Atelier Fit</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto px-margin md:px-margin-tablet lg:px-margin-desktop no-scrollbar py-1">
          <button
            onClick={() => setSelectedSize(null)}
            className={`h-9 px-4 font-label-lg text-label-lg uppercase tracking-wider flex-shrink-0 transition-all ${
              selectedSize === null
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low text-on-surface hover:bg-surface-container"
            }`}
          >
            All
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className={`h-9 px-4 font-label-lg text-label-lg uppercase tracking-wider flex-shrink-0 transition-all ${
                selectedSize === size
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Sticky Dual Control Action Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-surface/95 backdrop-blur-md px-margin md:px-margin-tablet lg:px-margin-desktop py-2.5 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFilterOpen(true)}
            className="h-11 px-3 bg-surface-container-low text-on-surface flex items-center justify-between hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M7 12h10m-7 6h4" />
              </svg>
              <span className="font-label-lg text-label-lg uppercase tracking-widest font-medium">
                Filter
              </span>
            </div>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setSortOpen((s) => !s)}
              className="w-full h-11 px-3 bg-surface-container-low text-on-surface flex items-center justify-between hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-1.5 truncate">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 4v13m0 0-3-3m3 3 3-3M17 20V7m0 0-3 3m3-3 3 3" />
                </svg>
                <span className="font-label-lg text-label-lg uppercase tracking-wider truncate">
                  {sort}
                </span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute top-12 right-0 w-56 bg-surface-container-lowest shadow-xl py-2 z-40 animate-fade-in">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSort(opt);
                      setSortOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left font-label-lg text-label-lg uppercase tracking-wider transition-colors ${
                      sort === opt
                        ? "text-on-surface font-semibold bg-surface-container-low"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid: 4 cols desktop, 3 tablet, 2 mobile */}
      <section className="px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-sm pb-space-lg">
        {filtered.length === 0 ? (
          <div className="py-space-2xl text-center">
            <p className="font-serif text-headline-md text-on-surface mb-space-sm">
              No silhouettes match your filters
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Try adjusting your selection to discover more creations.
            </p>
            <button
              onClick={resetFilters}
              className="h-11 px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest hover:bg-primary-container transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-gutter md:gap-y-gutter-desktop lg:gap-x-gutter-desktop">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        <div className="mt-space-lg flex flex-col items-center justify-center gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
            Displaying {filtered.length} of {PRODUCTS.length} Silhouettes
          </span>
          <div className="w-36 h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (filtered.length / PRODUCTS.length) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Filter Bottom Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setFilterOpen(false)}
          />
          <div className="absolute bottom-0 inset-x-0 bg-surface-container-lowest shadow-2xl max-h-[85vh] flex flex-col animate-slide-up rounded-t-2xl">
            <div className="flex items-center justify-between px-gutter py-space-md bg-surface-container-low rounded-t-2xl">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-headline-md text-headline-md text-on-surface">
                  Refine Silhouettes
                </h3>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-on-primary font-label-sm text-label-sm">
                    {activeFilterCount} Active
                  </span>
                )}
              </div>
              <button
                aria-label="Close Filter Drawer"
                className="w-9 h-9 bg-surface-container flex items-center justify-center text-on-surface"
                onClick={() => setFilterOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-gutter py-space-sm flex flex-col gap-5">
              <div>
                <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-medium block mb-2">
                  Price Spectrum
                </span>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {PRICE_BANDS.map((band) => (
                    <button
                      key={band}
                      onClick={() =>
                        setSelectedPrice(selectedPrice === band ? null : band)
                      }
                      className={`px-3 py-1 font-label-sm text-label-sm transition-colors ${
                        selectedPrice === band
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-low text-on-surface"
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-medium block mb-2">
                  Heritage Fabric
                </span>
                <div className="flex flex-wrap gap-2">
                  {FABRICS.map((fabric) => {
                    const active = selectedFabrics.includes(fabric);
                    return (
                      <button
                        key={fabric}
                        onClick={() =>
                          setSelectedFabrics((prev) =>
                            active
                              ? prev.filter((f) => f !== fabric)
                              : [...prev, fabric]
                          )
                        }
                        className={`px-3 py-1.5 font-label-sm text-label-sm tracking-wide transition-colors ${
                          active
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-low text-on-surface"
                        }`}
                      >
                        {fabric}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-title-md text-title-md text-on-surface block">
                    Ready to Ship
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dispatch within 24 hours
                  </span>
                </div>
                <button
                  onClick={() => setReadyToShip((r) => !r)}
                  className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                    readyToShip ? "bg-primary justify-end" : "bg-surface-container-highest justify-start"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-on-primary block" />
                </button>
              </div>
            </div>
            <div className="p-gutter bg-surface-container-low flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 h-12 bg-surface-container text-on-surface font-label-lg text-label-lg uppercase tracking-widest hover:bg-surface-container-high transition-colors"
              >
                Clear{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-[2] h-12 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest hover:bg-primary-container transition-colors shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 px-margin text-center">
          <p className="font-body-sm text-on-surface-variant">Loading collection...</p>
        </div>
      }
    >
      <CollectionInner />
    </Suspense>
  );
}
