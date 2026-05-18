import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Water Testing — PoolStuff",
  description: "Water testing equipment from PoolStuff — Lovibond photometers, pH and TDS meters, and reagents for commercial pool water analysis.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Photometers",
    icon: "🔬",
    blurb: "Lovibond single- and multi-parameter photometers for accurate water chemistry analysis.",
  },
  {
    name: "Ph, TDS Meters",
    icon: "📊",
    blurb: "Handheld digital pH, TDS, and conductivity meters for routine water testing.",
  },
  {
    name: "Reagents",
    icon: "💊",
    blurb: "Genuine Lovibond DPD, Phenol Red, and other reagent tablets for chlorine and pH testing.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Water Testing")}&subcategory=${encodeURIComponent(name)}`;

export default function WaterTestingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Water Testing</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Water Testing</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            PoolStuff is an authorized Lovibond service centre — photometers, meters, and reagents to keep your water analysis accurate and compliant.
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
            href={`/products?category=${encodeURIComponent("Water Testing")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Water Testing range
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
