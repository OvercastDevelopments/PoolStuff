import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lane Rope & Accessories — PoolStuff",
  description: "Lane ropes, Storeels storage caddies, and hardware fittings for commercial lap pools and aquatic facilities.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Lane Ropes",
    icon: "〰️",
    blurb: "Wave-killing competition lane ropes in standard and custom lengths.",
  },
  {
    name: "Storeels Caddy",
    icon: "🛒",
    blurb: "Storeels mobile caddies and reels for easy lane rope storage and deployment.",
  },
  {
    name: "Hardware & Fittings",
    icon: "🔩",
    blurb: "Anchor hooks, tensioning cleats, and stainless fittings for lane rope installs.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Lane Rope & Accessories")}&subcategory=${encodeURIComponent(name)}`;

export default function LaneRopePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Lane Rope &amp; Accessories</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Lane Rope &amp; Accessories</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Competition-grade lane ropes, Storeels storage caddies, and the stainless hardware to install them — everything for lap pools and aquatic centres.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((t) => (
            <Link
              key={t.name}
              href={tileHref(t.name)}
              className="group bg-white rounded-2xl border border-sky-100 p-7 hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
            >
              <div className="text-5xl mb-4">{t.icon}</div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                {t.name}
              </h2>
              <p className="text-slate-600 mt-2 flex-1">{t.blurb}</p>
              <span className="mt-5 text-sky-600 font-semibold text-sm">
                Browse {t.name} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <p className="text-slate-600">
          Looking for something specific? Browse the{" "}
          <Link
            href={`/products?category=${encodeURIComponent("Lane Rope & Accessories")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Lane Rope &amp; Accessories range
          </Link>
          {" "}or{" "}
          <Link href="/contact" className="text-sky-600 hover:text-sky-700 font-semibold">
            get in touch
          </Link>
          {" "}for a tailored quote.
        </p>
      </section>
    </>
  );
}
