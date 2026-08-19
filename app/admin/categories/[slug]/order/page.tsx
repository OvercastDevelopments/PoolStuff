import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { moveProduct } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function ReorderProductsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: { id: true, name: true, imageUrl: true, sortOrder: true, subcategory: { select: { name: true } } },
      },
    },
  });

  if (!category) notFound();

  async function doMove(formData: FormData) {
    "use server";
    const direction = String(formData.get("direction"));
    await moveProduct(
      String(formData.get("id")),
      direction === "up" ? "up" : "down"
    );
  }

  const products = category.products;

  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">
        <Link href="/admin/categories" className="hover:text-slate-800">Categories</Link>
        <span className="mx-2 opacity-60">/</span>
        <span>{category.name}</span>
      </p>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Reorder products</h1>
      <p className="text-slate-600 mb-6">
        This is the exact order shoppers see when they filter to{" "}
        <strong>{category.name}</strong>. Changes save immediately.
      </p>

      {category.productOrder !== "MANUAL" && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 text-sm">
          This category is currently set to <strong>{category.productOrder === "NATURAL" ? "Alphabetical, number-aware" : "Alphabetical"}</strong>,
          so the order below is <strong>not</strong> being used on the site. Set it to
          Manual on the{" "}
          <Link href="/admin/categories" className="underline font-semibold">Categories screen</Link>{" "}
          for these positions to take effect.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {products.length === 0 && (
          <p className="px-5 py-10 text-center text-slate-500">
            No products in this category yet.
          </p>
        )}
        <ul className="divide-y divide-slate-200">
          {products.map((p, i) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50">
              <span className="w-8 text-sm font-semibold text-slate-400 tabular-nums">
                {i + 1}
              </span>
              <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                {p.imageUrl && (
                  <Image src={p.imageUrl} alt={p.name} fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 truncate">{p.name}</div>
                <div className="text-xs text-slate-500">{p.subcategory?.name ?? "—"}</div>
              </div>
              <div className="flex items-center gap-1">
                <form action={doMove}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={i === 0}
                    aria-label={`Move ${p.name} up`}
                    className="w-9 h-9 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    ↑
                  </button>
                </form>
                <form action={doMove}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={i === products.length - 1}
                    aria-label={`Move ${p.name} down`}
                    className="w-9 h-9 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    ↓
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {products.length} product{products.length === 1 ? "" : "s"}. New products are added to the end.
      </p>
    </div>
  );
}
