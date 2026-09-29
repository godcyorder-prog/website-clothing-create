import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, HERO_IMAGE, HERITAGE_IMAGE } from "@/lib/products";

const CATEGORIES = [
  {
    tag: "Signature Fluidity",
    title: "Contemporary Maxi Dresses",
    desc: "Gentle drapes cut from hand-block printed cotton and mulmul, engineered with breathable ease.",
    count: "01 / 28 Styles",
    image: PRODUCTS[10].image,
    href: "/collection?category=Dresses",
  },
  {
    tag: "Heritage Occasion",
    title: "Chanderi & Mulmul Sets",
    desc: "Luminous handloom organza, real metallic zari threads, and scalloped hem details handcrafted by master karigars.",
    count: "02 / 34 Styles",
    image: PRODUCTS[8].image,
    href: "/collection?category=Ethnic%20Wear",
  },
  {
    tag: "Resort & Tailored",
    title: "Handloom Co-Ords & Sets",
    desc: "Unstructured blazers, relaxed wide-leg trousers, and fluid overlay coats woven from wild Tussar silks.",
    count: "03 / 19 Styles",
    image: PRODUCTS[9].image,
    href: "/collection?category=Co-Ords%20%26%20Jumpsuits",
  },
];

const PRESS = [
  {
    quote:
      "Zaria Atelier redefines Indian quiet luxury through unhurried weaves, breathtaking drape, and sublime restraint.",
    outlet: "VOGUE INDIA",
    section: "The Luxury Edit",
  },
  {
    quote:
      "A poetic synthesis of Maheshwari royal textile traditions and hyper-chic silhouettes for the modern connoisseur.",
    outlet: "HARPER'S BAZAAR",
    section: "Sustainability Spotlight",
  },
  {
    quote:
      "The Chanderi co-ords represent tactile perfection—weightless, luminous, and endlessly wearable across continents.",
    outlet: "ELLE DECOR",
    section: "Artisanal Living",
  },
  {
    quote:
      "In an era of fleeting trends, Zaria crafts garments meant to be treasured, worn, and inherited like fine heirloom art.",
    outlet: "GRAZIA",
    section: "Couture Review",
  },
];

const PERKS = [
  {
    title: "Complimentary Shipping",
    desc: "Express insured delivery across all Indian pin codes on orders exceeding ₹1,999.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="17" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Virtual Atelier Fitting",
    desc: "One-on-one live video appointments with our master drape stylist and garment fitters.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="13" height="12" rx="1" />
        <path d="m15 10 6-3v10l-6-3" />
      </svg>
    ),
  },
  {
    title: "Doorstep Exchanges",
    desc: "7-day seamless pickup and size replacement with zero handling charges.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
  {
    title: "Certified Pure Fibres",
    desc: "Silk Mark and India Handloom Brand certified organic raw materials guaranteed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "100%", label: "Traceable Looms", desc: "Direct fair-trade sourcing without intermediaries." },
  { value: "400+", label: "Artisans Supported", desc: "Committed living wages & generational craft protection." },
  { value: "0%", label: "Synthetics Used", desc: "Strictly pure silks, mulmuls, and Belgian flax." },
];

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="pt-16 md:pt-20">
      {/* 1. Editorial Hero Showcase */}
      <section className="relative w-full overflow-hidden bg-surface">
        <div className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md lg:py-space-lg">
          <div className="relative w-full h-[520px] md:h-[620px] lg:h-[720px] bg-surface-container flex flex-col justify-end p-space-lg md:p-space-xl lg:p-space-2xl overflow-hidden shadow-sm">
            <div className="absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt="Editorial fashion campaign photo of high fashion Indian model wearing an ethereal raw silk ivory chanderi flowy maxi dress in soft natural warm sunlight inside an architectural stone courtyard in Rajasthan"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                quality={90}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
            <div className="absolute top-space-lg left-space-lg md:top-space-xl md:left-space-xl bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-xs shadow-sm">
              <p className="font-label-sm text-label-sm tracking-[0.18em] uppercase text-on-surface">
                Spring Solstice Capsule • N° 04
              </p>
            </div>
            <div className="absolute top-space-lg right-space-lg md:top-space-xl md:right-space-xl hidden sm:flex items-center gap-space-xs text-on-primary font-label-sm text-label-sm tracking-[0.18em] uppercase opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>Limited 150 Editions Worldwide</span>
            </div>
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <span className="font-label-lg text-label-lg uppercase tracking-[0.18em] text-surface-dim">
                  Atelier Collection 2026
                </span>
                <span className="h-px w-8 bg-surface-dim opacity-60" />
                <span className="font-label-lg text-label-lg uppercase tracking-[0.18em] text-surface-dim">
                  Maheshwar Silks
                </span>
              </div>
              <h1 className="font-serif text-display-xl text-on-primary mb-space-sm tracking-tight leading-[1.08]">
                Handcrafted Silhouettes &amp; Handwoven Chanderi
              </h1>
              <p className="font-body-lg text-body-lg text-surface-bright/90 max-w-xl mb-space-lg leading-relaxed font-light">
                A harmonious ode to Rajasthani block prints, raw mulberry silks, and
                timeless contemporary tailoring designed to breathe and move with quiet grace.
              </p>
              <div className="flex flex-wrap items-center gap-space-md">
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center bg-surface-container-lowest text-primary px-space-xl py-3.5 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-surface-container-high transition-colors duration-200"
                >
                  Explore the Capsule
                </Link>
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center bg-transparent text-on-primary px-space-lg py-3.5 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-surface-container-lowest/15 backdrop-blur-sm transition-colors duration-200 gap-space-xs"
                >
                  <span>View Lookbook</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative z-10 mt-space-xl pt-space-md flex flex-wrap items-center justify-between gap-space-sm text-surface-container-high font-body-sm text-body-sm opacity-80">
              <p>Hand-spun Weaves • AZO-Free Herbal Dyes • Zero Polyester</p>
              <div className="flex items-center gap-space-sm">
                <span className="w-12 h-0.5 bg-surface-container-lowest" />
                <span className="w-4 h-0.5 bg-surface-container-lowest/30" />
                <span className="w-4 h-0.5 bg-surface-container-lowest/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Categories / Silhouettes Grid */}
      <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl bg-surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <p className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-on-surface-variant mb-space-xs">
              The Curated Wardrobe
            </p>
            <h2 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
              Essential Silhouettes
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Carefully proportioned garments created with centuries-old Indian artisan
            techniques, tailored for global modern ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={85}
                />
                <div className="absolute top-space-md left-space-md bg-surface-container-lowest/90 px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  {cat.count}
                </div>
              </div>
              <div className="p-space-lg flex flex-col justify-between flex-grow bg-surface-container-lowest">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-on-surface-variant">
                    {cat.tag}
                  </span>
                  <h3 className="font-serif text-headline-md text-headline-md text-on-surface mt-1 group-hover:text-secondary transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface font-label-lg text-label-lg tracking-[0.14em] uppercase">
                  <span>Discover Silhouette</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-200">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Masterpiece 4-Column Product Grid */}
      <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl bg-surface-container-low">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-[0.18em] mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Curated Currents</span>
            </div>
            <h2 className="font-serif text-headline-lg text-headline-lg text-on-surface tracking-tight">
              Iconic Silhouettes
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Beloved creations cut from organic fibres and hand-finished by master craftspeople.
            </p>
          </div>
          <div className="mt-space-md md:mt-0 flex items-center gap-space-sm">
            <Link
              href="/collection"
              className="font-label-lg text-label-lg uppercase tracking-[0.14em] text-on-surface hover:text-secondary flex items-center gap-space-xs"
            >
              <span>View Full Catalogue</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-space-xl p-space-md bg-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary shrink-0">
              <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <div>
              <h5 className="font-title-md text-title-md text-on-surface">
                Require Bespoke Hemming or Custom Neckline?
              </h5>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Our in-house master tailors provide complimentary silhouette adjustments on all orders.
              </p>
            </div>
          </div>
          <Link
            href="/account"
            className="inline-flex items-center justify-center bg-primary text-on-primary px-space-lg py-2.5 font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors whitespace-nowrap"
          >
            Request Bespoke Consultation
          </Link>
        </div>
      </section>

      {/* 4. Artisanal Heritage & Craft Story Section */}
      <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-2xl bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden shadow-sm">
              <Image
                src={HERITAGE_IMAGE}
                alt="Macro close-up documentary photograph of skilled artisan hands weaving delicate gold zari and silk yarns on an authentic wooden handloom pit loom in Maheshwar India"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 max-w-xs bg-surface-container-lowest p-space-lg shadow-md">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-secondary font-semibold">
                Provenance
              </span>
              <p className="font-serif text-[18px] text-on-surface mt-1 leading-snug">
                Pit Looms of Maheshwar
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Preserving a 500-year-old weaving lineage passed down through generations of craft masters.
              </p>
              <div className="mt-space-sm pt-space-xs text-[11px] font-label-sm tracking-wider uppercase text-outline">
                Documented April 2026
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-space-lg">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-[0.18em] uppercase mb-space-sm">
              <span>Our Ethos</span>
              <span>•</span>
              <span>The Weaver's Hand</span>
            </div>
            <h2 className="font-serif text-display-lg text-display-lg text-on-surface tracking-tight leading-[1.15]">
              The Thread of Legacy
            </h2>
            <blockquote className="my-space-md font-serif text-headline-md text-headline-md text-on-surface-variant italic leading-relaxed">
              "Every warp and weft at Zaria connects directly to multi-generational weaver
              families across Maheshwar, Bagru, and Bengal."
            </blockquote>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg leading-relaxed">
              We reject the accelerated pace of commercial fashion. Instead, each metre of our
              fabric is hand-spun and slow-woven over weeks, allowing natural slubs and organic
              variations that ensure no two pieces can ever be duplicated.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mb-space-xl">
              {STATS.map((s) => (
                <div key={s.label} className="bg-surface-container-low p-space-md">
                  <span className="font-serif text-[32px] text-primary block leading-none">
                    {s.value}
                  </span>
                  <span className="font-title-md text-[13px] text-on-surface mt-2 block font-medium">
                    {s.label}
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant block mt-0.5">
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/collection"
                className="inline-flex items-center gap-space-sm font-label-lg text-label-lg uppercase tracking-[0.16em] text-on-surface hover:text-secondary transition-colors"
              >
                <span>Read Our Artisan Journal</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Press & Editorial Endorsements */}
      <section className="w-full bg-surface-container-lowest py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-xl mx-auto mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">
            Critical Acclaim
          </span>
          <h3 className="font-serif text-headline-md text-headline-md text-on-surface mt-1">
            Recognized by the World of Fashion
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PRESS.map((p) => (
            <div key={p.outlet} className="bg-surface p-space-lg flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-serif text-display-lg leading-none text-outline-variant">
                  "
                </span>
                <p className="font-body-md text-body-md text-on-surface italic -mt-3">
                  {p.quote}
                </p>
              </div>
              <div className="mt-space-md pt-space-sm">
                <span className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-on-surface block font-semibold">
                  {p.outlet}
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  {p.section}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Client Privilege Banner / Atelier Concierge */}
      <section className="w-full bg-surface-container py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {PERKS.map((perk) => (
            <div key={perk.title} className="flex items-start gap-space-md">
              <div className="w-12 h-12 flex-shrink-0 bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                {perk.icon}
              </div>
              <div>
                <h4 className="font-title-md text-title-md text-on-surface font-medium">
                  {perk.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
