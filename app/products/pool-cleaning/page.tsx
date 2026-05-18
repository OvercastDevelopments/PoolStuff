import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Cleaning — PoolStuff",
  description: "Commercial pool cleaning gear from PoolStuff — robotic cleaners, manual vacs, vac parts, and Dolphin robotic spare parts.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Commercial Robotic Cleaners",
    icon: "🤖",
    blurb: "Heavy-duty Dolphin robotic cleaners built for commercial pool environments.",
  },
  {
    name: "Manual Vacs",
    icon: "🧹",
    blurb: "Manual vacuum heads, plates, and hoses for hands-on pool cleaning.",
  },
  {
    name: "Vac Parts & Cleaning",
    icon: "🧽",
    blurb: "Poles, nets, brushes, and replacement parts to keep your cleaning kit working.",
  },
  {
    name: "Robotic Parts",
    icon: "⚙️",
    blurb: "Genuine Dolphin replacement parts — brushes, filters, drive motors, and more.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Pool Cleaning")}&subcategory=${encodeURIComponent(name)}`;

export default function PoolCleaningPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Pool Cleaning</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Pool Cleaning</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            From commercial Dolphin robots to manual vacs and genuine spare parts — everything you need to keep your pool spotless.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            href={`/products?category=${encodeURIComponent("Pool Cleaning")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Pool Cleaning range
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
