import Link from "next/link";
import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import HeroSearch from "./components/HeroSearch";
import { asset } from "./lib/asset";

const featuredProducts = [
  { name: "VarioFlo VS-10 Commercial Pump", tag: "Equipment", blurb: "High-flow variable-speed pump built for commercial circulation loads." },
  { name: "CrystalClear C-800 Filter", tag: "Equipment", blurb: "High-capacity commercial cartridge filter for heavy bather loads." },
  { name: "BalancePro Commercial Kit", tag: "Chemicals", blurb: "Bulk-scale water chemistry starter kit for public and semi-public pools." },
];

const brands = [
  { name: "ANTI Wave", src: "/brands/antiwave.png" },
  { name: "Empex Water Toys", src: "/brands/empex.png" },
  { name: "Lovibond", src: "/brands/lovibond.png" },
  { name: "Maytronics", src: "/brands/maytronics1.png" },
  { name: "Para Mobility", src: "/brands/paramobility.png" },
  { name: "SR Smith", src: "/brands/sr-smith.png" },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white min-h-[72vh] flex items-center">
        <HeroSlider />
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20 w-full">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-4">
            Commercial pool products · service · installation
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
            Commercial pool expertise your facility can count on.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-sky-50 max-w-2xl">
            Hotels, HOAs, fitness centers, aquatic facilities, and municipalities trust PoolStuff for commercial-grade equipment, code-compliant maintenance, and fast equipment service — keeping pools open and patrons safe.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-white text-sky-700 hover:bg-sky-50 px-6 py-3 rounded-full font-semibold transition"
            >
              View Products
            </Link>
            <Link
              href="/contact"
              className="bg-sky-800/40 hover:bg-sky-800/60 border border-white/40 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Request a Proposal
            </Link>
          </div>
          <HeroSearch />
        </div>
      </section>

      <section className="bg-slate-200 border-y border-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 max-w-3xl mx-auto leading-snug">
            Suppliers of the World&apos;s Finest Aquatic Facility &amp; Performance Equipment
          </h2>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center justify-items-center">
            {brands.map((b) => (
              <div key={b.name} className="relative h-20 w-full max-w-[160px]">
                <Image
                  src={asset(b.src)}
                  alt={b.name}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sky-600 font-semibold uppercase tracking-wider text-sm">Top sellers</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Featured Products</h2>
            </div>
            <Link href="/products" className="text-sky-600 hover:text-sky-700 font-semibold hidden sm:inline">
              Shop all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-cyan-300" />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cyan-700">{p.tag}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{p.name}</h3>
                  <p className="text-slate-600 text-sm mt-2">{p.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pt-24 pb-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Let&apos;s keep your facility open.
        </h2>
        <p className="mt-4 text-slate-600 max-w-xl">
          Tell us about your property and we&apos;ll put together a detailed proposal — typically within two business days.
        </p>
        <Link
          href="/contact"
          className="mt-8 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Request a Proposal
        </Link>
      </section>
    </>
  );
}
