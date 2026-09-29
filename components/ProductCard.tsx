"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatINR, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className="group flex flex-col bg-surface-container-lowest transition-all duration-300">
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          quality={85}
        />
        {product.badge && (
          <div className="absolute top-space-sm left-space-sm flex flex-col gap-1">
            <span
              className={`px-space-xs py-0.5 font-label-sm text-[10px] tracking-wider uppercase font-semibold ${
                product.badge === "SALE"
                  ? "bg-secondary text-on-secondary"
                  : product.badge === "LUXE ATELIER"
                  ? "bg-on-tertiary-fixed-variant text-on-tertiary"
                  : "bg-primary text-on-primary"
              }`}
            >
              {product.badge}
            </span>
            {product.discount && (
              <span className="bg-surface-container-lowest/90 text-on-surface px-space-xs py-0.5 font-label-sm text-[10px] tracking-wider uppercase">
                {product.discount}
              </span>
            )}
          </div>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/90 flex items-center justify-center text-on-surface hover:text-secondary transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.3 4.5 6.2 4.5c2.3 0 3.9 1.3 4.8 2.7.9-1.4 2.5-2.7 4.8-2.7 3.9 0 5.8 4.1 4.2 7.2C19.5 16.3 12 21 12 21Z" />
          </svg>
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
          <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider text-center">
            Quick Select Size
          </span>
          <div className="flex items-center justify-center gap-1">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id, size);
                }}
                className="w-7 h-7 text-[11px] font-medium bg-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </Link>
      <div className="pt-space-md pb-space-xs flex flex-col flex-grow">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {product.fabric}
        </span>
        <h4 className="font-serif text-[18px] text-on-surface mt-1 group-hover:text-secondary transition-colors leading-tight">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h4>
        <div className="mt-space-sm flex items-baseline gap-space-sm flex-wrap">
          <span className="font-price-lg text-price-lg text-on-surface font-medium">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-price-md text-price-md text-outline line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span className="font-label-sm text-[10px] text-secondary font-semibold uppercase">
              Save {formatINR((product.originalPrice ?? 0) - product.price)}
            </span>
          )}
        </div>
        <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-[11px]">
          <span>{product.color}</span>
          <span className="text-tertiary-fixed-dim font-medium">In Stock</span>
        </div>
      </div>
    </article>
  );
}
