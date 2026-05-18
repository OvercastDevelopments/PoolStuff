import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Starting Blocks — PoolStuff",
  description: "ANTI Wave starting blocks, track-start models, block covers, and backstroke start ledges from PoolStuff.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "ANTI 600",
    icon: "🏁",
    blurb: "ANTI Wave 600 starting blocks — reliable, FINA-compliant entry-level competition blocks.",
  },
  {
    name: "ANTI 750 Track Start",
    icon: "🏃",
    blurb: "ANTI Wave 750 blocks with integrated adjustable track-start wedge.",
  },
  {
    name: "ANTI WAVE 800 Track start",
    icon: "🌊",
    blurb: "Top-tier ANTI Wave 800 Track Start blocks — international competition-grade.",
  },
  {
    name: "Start Block Covers",
    icon: "🛡️",
    blurb: "UV-stable vinyl covers and custom sponsor covers for starting blocks.",
  },
  {
    name: "Anti Back Stroke Ledges",
    icon: "🔙",
    blurb: "Fixed and adjustable ANTI backstroke start ledges — FINA-approved for competition.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Starting Blocks")}&subcategory=${encodeURIComponent(name)}`;

export default function StartingBlocksPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Starting Blocks</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Starting Blocks</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            ANTI Wave starting blocks, track-start models, covers, and backstroke ledges — competition-ready hardware for serious aquatic facilities.
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
            href={`/products?category=${encodeURIComponent("Starting Blocks")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Starting Blocks range
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
