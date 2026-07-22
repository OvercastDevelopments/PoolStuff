import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../lib/prisma";
import { deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

type SearchParams = { q?: string; category?: string; filter?: string };

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const categoryFilter = params.category ?? "";
  const onlyNew = params.filter === "new";

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
    prisma.product.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { blurb: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          categoryFilter ? { category: { slug: categoryFilter } } : {},
          onlyNew ? { isNew: true } : {},
        ],
      },
      include: {
        category: { select: { name: true, slug: true } },
        subcategory: { select: { name: true } },
      },
      orderBy: [{ updatedAt: "desc" }],
    }),
  ]);

  async function doDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deleteProduct(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-full transition"
        >
          + Add product
        </Link>
      </div>

      <form className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search products…"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <select
          name="category"
          defaultValue={categoryFilter}
          className="rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-700 px-3">
          <input
            type="checkbox"
            name="filter"
            value="new"
            defaultChecked={onlyNew}
            className="rounded"
          />
          Only new
        </label>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-full"
        >
          Filter
        </button>
        {(q || categoryFilter || onlyNew) && (
          <Link
            href="/admin/products"
            className="flex items-center px-4 py-2 rounded-full text-sm text-slate-600 hover:text-slate-900"
          >
            Reset
          </Link>
        )}
      </form>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Sub-category</th>
                <th className="text-left px-5 py-3">Price</th>
                <th className="text-left px-5 py-3">New</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    No products match those filters.
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        {p.imageUrl && (
                          <Image src={p.imageUrl} alt={p.name} fill sizes="48px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 max-w-md">{p.blurb}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{p.category.name}</td>
                  <td className="px-5 py-3 text-slate-700">{p.subcategory?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-700 whitespace-nowrap">{p.price}</td>
                  <td className="px-5 py-3">
                    {p.isNew && (
                      <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-sky-600 hover:text-sky-700 font-semibold"
                      >
                        Edit
                      </Link>
                      <form action={doDelete}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-700 font-semibold"
                          formNoValidate
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {products.length} product{products.length === 1 ? "" : "s"}.
      </p>
    </div>
  );
}
