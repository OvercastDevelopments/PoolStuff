import Image from "next/image";
import { asset } from "../lib/asset";

const brands = [
  { name: "ANTI Wave", src: "/brands/antiwave.png" },
  { name: "Empex Water Toys", src: "/brands/empex.png" },
  { name: "Lovibond", src: "/brands/lovibond.png" },
  { name: "Maytronics", src: "/brands/maytronics1.png" },
  { name: "Para Mobility", src: "/brands/paramobility.png" },
  { name: "SR Smith", src: "/brands/sr-smith.png" },
];

export default function BrandStrip() {
  return (
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
  );
}
