import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility — PoolStuff",
  description: "Accessibility equipment from PoolStuff — Paramobility and SR Smith hoists, wheelchairs, steps, changing tables, and replacement parts.",
};

type Tile = {
  label: string;
  subcategory: string;
  blurb: string;
  icon: string;
};

type Brand = {
  name: string;
  blurb: string;
  tiles: Tile[];
};

const brands: Brand[] = [
  {
    name: "Paramobility",
    blurb: "A full range of Paramobility accessibility equipment — hoists, wheelchairs, Platypus pool steps, changing tables, and genuine spare parts.",
    tiles: [
      { label: "Hoists", subcategory: "Paramobility Hoists", icon: "🏗️", blurb: "Aqualift and Easi-Lift hoists for accessible pool entry." },
      { label: "Wheelchairs", subcategory: "Paramobility Wheelchairs", icon: "♿", blurb: "Aquatic and beach wheelchairs built for wet-area and outdoor use." },
      { label: "Platypus Steps & Changing Table", subcategory: "Paramobility Platypus Steps & Changing Table", icon: "🪜", blurb: "Modular pool entry steps and adjustable changing tables." },
      { label: "Paramobility Parts", subcategory: "Paramobility Parts", icon: "🔧", blurb: "Genuine replacement batteries, slings, and service parts." },
    ],
  },
  {
    name: "SR Smith",
    blurb: "SR Smith pool lifts and genuine replacement parts — the trusted name in pool accessibility worldwide.",
    tiles: [
      { label: "Hoists", subcategory: "SR Smith Hoists", icon: "🏗️", blurb: "SR Smith PAL and Multilift pool lifts for fixed and portable installs." },
      { label: "SR Smith Parts", subcategory: "SR Smith Parts", icon: "🔧", blurb: "Genuine SR Smith batteries, slings, and service-replacement parts." },
    ],
  },
];

const tileHref = (subcategory: string) =>
  `/products?category=${encodeURIComponent("Accessibility")}&subcategory=${encodeURIComponent(subcategory)}`;

export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Accessibility</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Accessibility</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Code-compliant accessibility equipment for commercial pools and aquatic facilities — Paramobility and SR Smith hoists, wheelchairs, steps, and genuine parts.
          </p>
        </div>
      </section>

      {brands.map((brand) => (
        <section key={brand.name} className="max-w-6xl mx-auto px-6 py-14 border-b border-sky-100 last:border-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 inline-block border-l-4 border-sky-500 pl-4">
              {brand.name}
            </h2>
            <p className="text-slate-600 mt-3 max-w-3xl pl-5">{brand.blurb}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brand.tiles.map((t) => (
              <Link
                key={t.subcategory}
                href={tileHref(t.subcategory)}
                className="group bg-white rounded-2xl border border-sky-100 p-7 hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                <div className="text-5xl mb-4">{t.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                  {t.label}
                </h3>
                <p className="text-slate-600 mt-2 flex-1">{t.blurb}</p>
                <span className="mt-5 text-sky-600 font-semibold text-sm">
                  Browse {t.label} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-600">
          Looking for something specific? Browse the{" "}
          <Link
            href={`/products?category=${encodeURIComponent("Accessibility")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Accessibility range
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
