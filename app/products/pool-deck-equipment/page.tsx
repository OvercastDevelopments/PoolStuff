import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Deck Equipment — PoolStuff",
  description: "Pool deck equipment from PoolStuff — pace clocks, grating, signage, changing-room fittings, and backstroke fittings.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Clocks",
    icon: "⏱️",
    blurb: "Pace clocks and digital race clocks for training, lap counting, and competition.",
  },
  {
    name: "Grating",
    icon: "🔲",
    blurb: "Polymer pool edge and channel drainage grating — UV-stable and anti-slip.",
  },
  {
    name: "Pool Side Signage",
    icon: "🪧",
    blurb: "Compliance-ready depth markers, rules, and safety signage for commercial pools.",
  },
  {
    name: "Changing Rooms & Poolside",
    icon: "🚿",
    blurb: "Stainless benches, foot wash stations, and wet-area fittings for changing rooms and poolside.",
  },
  {
    name: "Backstroke Fittings",
    icon: "🚩",
    blurb: "FINA-spec backstroke flags, poles, and deck mounts for competition pools.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Pool Deck Equipment")}&subcategory=${encodeURIComponent(name)}`;

export default function PoolDeckEquipmentPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Pool Deck Equipment</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Pool Deck Equipment</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Hard-wearing equipment for the area around your pool — clocks, grating, signage, changing-room fittings, and backstroke gear.
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
            href={`/products?category=${encodeURIComponent("Pool Deck Equipment")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Pool Deck Equipment range
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
