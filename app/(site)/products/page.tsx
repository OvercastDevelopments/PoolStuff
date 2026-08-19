import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsCatalog, { type Product } from "./ProductsCatalog";
import { prisma } from "@/app/lib/prisma";
import type { OrderMode } from "@/app/lib/productOrder";

export const metadata: Metadata = {
  title: "Commercial Products — PoolStuff",
  description: "Commercial pool products — from accessibility equipment and water treatment to water park equipment and safety gear.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [rows, categoryRows] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        category: { select: { name: true } },
        subcategory: { select: { name: true } },
      },
    }),
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { name: true, productOrder: true },
    }),
  ]);

  const products: Product[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category.name,
    subcategory: r.subcategory?.name ?? null,
    price: r.price,
    blurb: r.blurb,
    imageUrl: r.imageUrl,
    sortOrder: r.sortOrder,
  }));

  const categories = categoryRows.map((c) => c.name);
  const categoryOrder: Record<string, OrderMode> = Object.fromEntries(
    categoryRows.map((c) => [c.name, c.productOrder as OrderMode])
  );

  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Commercial Products</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            From accessibility and safety gear to water treatment, aquatic fitness, and water park equipment — everything a commercial pool facility needs.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProductsCatalog products={products} categories={categories} categoryOrder={categoryOrder} />
      </Suspense>
    </>
  );
}
