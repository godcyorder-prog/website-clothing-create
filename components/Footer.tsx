import Link from "next/link";

const COLUMNS = [
  {
    title: "The Atelier",
    links: ["Our Heritage", "Handloom Weavers", "Sustainable Silks", "Press & Publications"],
  },
  {
    title: "Client Services",
    links: ["Bespoke Fitting", "Atelier Concierge", "Shipping & Customs", "Returns & Exchange", "Garment Care Guide"],
  },
  {
    title: "Boutique",
    links: ["New Arrivals", "Best Sellers", "Archive Sale", "Luxe Atelier", "Gift Cards"],
  },
  {
    title: "Connect",
    links: ["Instagram", "Pinterest", "Journal", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-highest">
      <div className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter-desktop">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-space-sm">
              <h3 className="font-label-lg text-label-lg uppercase tracking-[0.14em] text-on-surface mb-space-xs">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/collection"
                      className="hover:text-on-surface transition-colors duration-150"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-space-xl pt-space-lg border-t border-surface-container-highest flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 Zaria Atelier. Handcrafted with heritage.
          </p>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            <span>Silk Mark Certified</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>India Handloom Brand</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
