import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Watertoys — PoolStuff",
  description: "Watertoys from PoolStuff — fun mats, Empex water features, and water park tubes for commercial pools and aquatic facilities.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Fun Mats",
    icon: "🏄",
    blurb: "Inflatable obstacle courses and floating play mats built for commercial pool fun days.",
  },
  {
    name: "Empex WaterToys",
    icon: "🍄",
    blurb: "Iconic Empex splash-pad features — mushrooms, domes, and interactive water play.",
  },
  {
    name: "Water Park Tubes",
    icon: "🛟",
    blurb: "Single and double rider tubes for waterslides, lazy rivers, and raft rides.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Watertoys")}&subcategory=${encodeURIComponent(name)}`;

export default function WatertoysPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Watertoys</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Watertoys</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Play equipment for commercial pools and aquatic facilities — from inflatable obstacle courses to Empex water features and waterpark tubes.
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
            href={`/products?category=${encodeURIComponent("Watertoys")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Watertoys range
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
