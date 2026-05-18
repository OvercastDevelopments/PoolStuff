import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Swim School & Water Safety — PoolStuff",
  description: "Swim school and water safety equipment from PoolStuff — kickboards, swim platforms, pool buoys, flippers, and foam accessories.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Kickboard",
    icon: "🏊",
    blurb: "EVA foam kickboards for learn-to-swim, stroke training, and class programs.",
  },
  {
    name: "Swim Platforms",
    icon: "🪜",
    blurb: "Adjustable in-water and portable floor platforms for instructor-led lessons.",
  },
  {
    name: "Pool Buoy",
    icon: "🛟",
    blurb: "Pull buoys in adult and junior sizes for upper-body stroke training.",
  },
  {
    name: "Flippers",
    icon: "🐠",
    blurb: "Training fins and junior swim flippers to build kick strength and technique.",
  },
  {
    name: "Foam Acesseries",
    icon: "🧽",
    blurb: "Foam dive bricks, lane indicator cones, and drill aids for swim programs.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Swim School & Water Safety")}&subcategory=${encodeURIComponent(name)}`;

export default function SwimSchoolPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Swim School &amp; Water Safety</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Swim School &amp; Water Safety</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Equipment for swim schools and learn-to-swim programs — kickboards, platforms, pull buoys, training fins, and foam drill aids.
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
            href={`/products?category=${encodeURIComponent("Swim School & Water Safety")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Swim School &amp; Water Safety range
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
