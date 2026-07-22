import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { name: true } } },
  });
  if (!product) return { title: "Product — PoolStuff" };
  return {
    title: `${product.name} — PoolStuff`,
    description: product.blurb,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: { select: { name: true, slug: true } },
      subcategory: { select: { name: true } },
    },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    take: 3,
    include: { category: { select: { name: true } } },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-8">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <Link href={`/products/${product.category.slug}`} className="hover:text-white">
              {product.category.name}
            </Link>
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-sky-200 to-cyan-300 rounded-2xl overflow-hidden">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 z-10 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                New
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-semibold text-cyan-700 mb-3">
              <span>{product.category.name}</span>
              {product.subcategory && (
                <>
                  <span className="text-slate-400">·</span>
                  <span>{product.subcategory.name}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {product.name}
            </h1>
            <div className="mt-4 text-2xl font-bold text-sky-700">{product.price}</div>
            <p className="mt-6 text-slate-700 leading-relaxed text-lg">{product.blurb}</p>

            <div className="mt-8">
              <Link
                href={`/products/${product.category.slug}`}
                className="bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 font-semibold px-6 py-3 rounded-full transition inline-block"
              >
                Back to {product.category.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-sky-50/60 border-y border-sky-100">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              More from {product.category.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition block"
                >
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
                    <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                    <p className="text-slate-600 text-sm mt-2 line-clamp-2">{p.blurb}</p>
                    <span className="mt-4 inline-block text-sky-600 font-semibold text-sm">
                      View details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
