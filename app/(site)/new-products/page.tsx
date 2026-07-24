import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export const metadata: Metadata = {
  title: "New Products — PoolStuff",
  description: "The latest commercial pool equipment, chemistry, and technology added to the PoolStuff catalog.",
};

export const dynamic = "force-dynamic";

export default async function NewProductsPage() {
  const rows = await prisma.product.findMany({
    where: { isNew: true },
    orderBy: [{ updatedAt: "desc" }, { name: "asc" }],
    include: {
      category: { select: { name: true } },
    },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Just Added
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold">New Products</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            The latest additions to the PoolStuff catalog — hand-picked for facilities that demand efficiency, compliance, and reliability.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">
              No new products at the moment — check back soon or browse the full range.
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition block"
              >
                <span className="absolute top-4 left-4 z-10 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  New
                </span>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-sky-200 to-cyan-300">
                  {p.imageUrl && (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cyan-700">
                    {p.category.name}
                  </span>
                  <div className="flex items-start justify-between gap-3 mt-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition">
                      {p.name}
                    </h3>
                    <span className="text-sky-700 font-bold whitespace-nowrap text-sm">{p.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">{p.blurb}</p>
                  <span className="mt-5 inline-block text-sky-600 font-semibold text-sm">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Want to see the full catalog?</h2>
          <p className="mt-3 text-slate-600">
            Browse our complete lineup of commercial pool products across every category.
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
