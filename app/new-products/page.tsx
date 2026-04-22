import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Products — PoolStuff",
  description: "The latest commercial pool equipment, chemistry, and technology added to the PoolStuff catalog.",
};

type NewProduct = {
  name: string;
  category: "Equipment" | "Chemicals" | "Cleaning" | "Accessories" | "Technology";
  price: string;
  blurb: string;
  added: string;
};

const newProducts: NewProduct[] = [
  {
    name: "AquaSense IoT Controller",
    category: "Technology",
    price: "Contact for quote",
    blurb: "Cloud-connected water chemistry controller with real-time alerts, remote dosing, and compliance log export.",
    added: "April 2026",
  },
  {
    name: "VarioFlo VS-15 Pro Pump",
    category: "Equipment",
    price: "Contact for quote",
    blurb: "Next-gen high-flow variable-speed pump — 30% more efficient than the outgoing VS-10.",
    added: "April 2026",
  },
  {
    name: "CrystalClear UV-C Sanitizer",
    category: "Equipment",
    price: "Contact for quote",
    blurb: "Inline UV-C sterilization unit that reduces chlorine demand and combined chlorine by up to 80%.",
    added: "March 2026",
  },
  {
    name: "BalancePro Enzyme Treatment",
    category: "Chemicals",
    price: "Bulk pricing",
    blurb: "Commercial-strength enzyme formula that breaks down oils, lotions, and organics from heavy bather loads.",
    added: "March 2026",
  },
  {
    name: "RoboClean Fleet Manager",
    category: "Cleaning",
    price: "Contact for quote",
    blurb: "Multi-unit robotic cleaner system with scheduling dashboard — ideal for multi-pool properties.",
    added: "February 2026",
  },
  {
    name: "ComplyGuard Digital Logbook",
    category: "Accessories",
    price: "$299 / year",
    blurb: "Tablet-based digital chemistry logbook that satisfies most state and local commercial pool record requirements.",
    added: "February 2026",
  },
];

export default function NewProductsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Just Added
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold">New Products</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            The latest commercial pool equipment, chemistry, and technology added to the PoolStuff catalog — selected for facilities that demand efficiency, compliance, and reliability.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProducts.map((p) => (
            <article key={p.name} className="relative bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition">
              <span className="absolute top-4 left-4 z-10 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                New
              </span>
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-cyan-300" />
              <div className="p-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-wider font-semibold text-cyan-700">{p.category}</span>
                  <span className="text-slate-500">Added {p.added}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <span className="text-sky-700 font-bold whitespace-nowrap text-sm">{p.price}</span>
                </div>
                <p className="text-slate-600 text-sm mt-2">{p.blurb}</p>
                <button className="mt-5 w-full bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold py-2 rounded-full transition">
                  Inquire
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Want to see the full catalog?</h2>
          <p className="mt-3 text-slate-600">
            Browse our complete lineup of commercial pool products across equipment, chemistry, cleaning, and accessories.
          </p>
          <Link
            href="/products"
            className="inline-block mt-8 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
}
