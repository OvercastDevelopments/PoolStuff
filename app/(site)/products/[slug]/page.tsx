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
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category — PoolStuff" };
  return {
    title: `${category.name} — PoolStuff`,
    description: category.heroBlurb ?? `Browse ${category.name} at PoolStuff.`,
  };
}

export default async function CategoryLandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      subcategories: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!category) notFound();

  const heroTitle = category.heroTitle ?? category.name;
  const heroBlurb = category.heroBlurb ?? `Browse the full ${category.name} range at PoolStuff.`;

  const tileHref = (subName: string) =>
    `/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subName)}`;

  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="uppercase tracking-widest text-sky-100 text-sm font-semibold mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-60">/</span>
            <span>{category.name}</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">{heroTitle}</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">{heroBlurb}</p>
        </div>
      </section>

      {category.subcategories.length > 0 ? (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((s) => (
              <Link
                key={s.id}
                href={tileHref(s.name)}
                className="group bg-white rounded-2xl border border-sky-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                <div
                  className={
                    "relative aspect-[4/3] " +
                    (s.imageUrl
                      ? "bg-slate-100"
                      : "bg-gradient-to-br from-sky-200 to-cyan-300")
                  }
                >
                  {s.imageUrl && (
                    <Image
                      src={s.imageUrl}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                    {s.name}
                  </h2>
                  {s.blurb && <p className="text-slate-600 mt-2 flex-1">{s.blurb}</p>}
                  <span className="mt-5 text-sky-600 font-semibold text-sm">
                    Browse {s.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="text-slate-600">
            Browse the{" "}
            <Link
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              full {category.name} range
            </Link>
            .
          </p>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <p className="text-slate-600">
          Looking for something specific? Browse the{" "}
          <Link
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className="text-sky-600 hover:text-sky-700 font-semibold"
          >
            full {category.name} range
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
