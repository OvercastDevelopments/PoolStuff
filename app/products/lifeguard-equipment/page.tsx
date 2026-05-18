import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lifeguard Equipment — PoolStuff",
  description: "Browse PoolStuff lifeguard equipment by category — rescue equipment, lifeguard gear, spinal equipment, first aid, rescue manikins, and lifeguard chairs.",
};

type Tile = {
  name: string;
  blurb: string;
  icon: string;
};

const tiles: Tile[] = [
  {
    name: "Rescue Equipment",
    icon: "🛟",
    blurb: "Reach poles, rescue tubes, throw bags, and ring buoys.",
  },
  {
    name: "Lifeguard Gear",
    icon: "🦺",
    blurb: "Uniforms, whistles, caps, and personal kit for lifeguards.",
  },
  {
    name: "Spinal Equipment",
    icon: "🩺",
    blurb: "Spinal boards, head immobilisers, and cervical collars.",
  },
  {
    name: "First Aid",
    icon: "🩹",
    blurb: "First-aid kits and wall-mounted cabinets for aquatic facilities.",
  },
  {
    name: "Rescue Manikins",
    icon: "🧍",
    blurb: "CPR training and in-water rescue manikins for staff training.",
  },
  {
    name: "Lifeguard Chairs",
    icon: "🪑",
    blurb: "Elevated observation chairs and mobile lifeguard stands.",
  },
];

const tileHref = (name: string) =>
  `/products?category=${encodeURIComponent("Lifeguard Equipment")}&subcategory=${encodeURIComponent(name)}`;

export default function LifeguardEquipmentPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>Lifeguard Equipment</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Lifeguard Equipment</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Everything your lifeguards need — from rescue tools and uniforms to spinal equipment, training manikins, and observation chairs.
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
            href={`/products?category=${encodeURIComponent("Lifeguard Equipment")}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full Lifeguard Equipment range
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
