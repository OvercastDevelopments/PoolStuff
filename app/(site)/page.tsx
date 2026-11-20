import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/app/components/HeroSlider";
import HeroSearch from "@/app/components/HeroSearch";
import BrandStrip from "@/app/components/BrandStrip";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

// Featured by slug rather than by copied text, so each card shows the live
// photo, name and blurb from the catalog instead of a duplicate that goes
// stale the moment someone edits the product in the admin.
const FEATURED = [
  { slug: "wave-100-heavy-duty-commercial-robot", tag: "Pool Cleaning" },
  { slug: "floaty-starfish-bodyboard", tag: "Water Toys" },
  { slug: "lovibond-md150-photometer", tag: "Water Testing" },
];

async function fetchFeatured() {
  try {
    const rows = await prisma.product.findMany({
      where: { slug: { in: FEATURED.map((f) => f.slug) } },
      select: { name: true, slug: true, blurb: true, imageUrl: true },
    });
    // findMany ignores the order of the `in` list, so restore the intended one.
    // A product that has been renamed or deleted simply drops out.
    return FEATURED.flatMap((f) => {
      const row = rows.find((r) => r.slug === f.slug);
      return row ? [{ ...row, tag: f.tag }] : [];
    });
  } catch {
    // DB unreachable (e.g. Neon cold start) — render the page without the
    // section rather than failing the whole home page.
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await fetchFeatured();

  return (
    <>
      <section className="relative isolate overflow-hidden text-white min-h-[72vh] flex items-center">
        <HeroSlider />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-4">
            Commercial pool products · service · installation
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
            Commercial pool expertise your facility can count on.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-sky-50 max-w-2xl">
            PoolStuff provides commercial-grade equipment, ensures code-compliant maintenance, and offers prompt equipment service — all aimed at keeping pools operational and ensuring the safety of patrons.
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
              Request a Quote
            </Link>
          </div>
          <HeroSearch />
        </div>
      </section>

      <BrandStrip />

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
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition flex flex-col"
              >
                <div
                  className={
                    "relative aspect-[4/3] " +
                    (p.imageUrl
                      ? "bg-slate-100"
                      : "bg-gradient-to-br from-sky-200 to-cyan-300")
                  }
                >
                  {p.imageUrl && (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cyan-700">{p.tag}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-sky-700 transition">
                    {p.name}
                  </h3>
                  <div className="mt-2 flex-1">
                    <p className="text-slate-600 text-sm line-clamp-2">{p.blurb}</p>
                  </div>
                  <span className="mt-5 inline-block text-sky-600 font-semibold text-sm">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
