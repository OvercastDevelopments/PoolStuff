import { prisma } from "../../lib/prisma";
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
  updateCategory,
  updateSubcategory,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      subcategories: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
      _count: { select: { products: true } },
    },
  });

  async function doDeleteCat(formData: FormData) {
    "use server";
    await deleteCategory(String(formData.get("id")));
  }
  async function doDeleteSub(formData: FormData) {
    "use server";
    await deleteSubcategory(String(formData.get("id")));
  }
  async function doUpdateCat(formData: FormData) {
    "use server";
    await updateCategory(String(formData.get("id")), formData);
  }
  async function doUpdateSub(formData: FormData) {
    "use server";
    await updateSubcategory(String(formData.get("id")), formData);
  }
  async function doCreateSub(formData: FormData) {
    "use server";
    await createSubcategory(String(formData.get("categoryId")), formData);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Categories</h1>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Add category</h2>
        <form action={createCategory} className="grid sm:grid-cols-2 gap-3">
          <input
            name="name"
            type="text"
            required
            placeholder="Name (e.g. Chemicals)"
            className="rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="heroBlurb"
            type="text"
            placeholder="Optional short description for the landing page"
            className="rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="sm:col-span-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-full transition"
          >
            + Add category
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {categories.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6">
              <form action={doUpdateCat} className="grid md:grid-cols-3 gap-3">
                <input type="hidden" name="id" value={c.id} />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={c.name}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero title (optional)</label>
                  <input
                    name="heroTitle"
                    type="text"
                    defaultValue={c.heroTitle ?? ""}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero blurb</label>
                  <input
                    name="heroBlurb"
                    type="text"
                    defaultValue={c.heroBlurb ?? ""}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="md:col-span-3 flex items-center gap-3">
                  <button type="submit" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
                    Save
                  </button>
                  <span className="text-xs text-slate-500">
                    {c._count.products} product{c._count.products === 1 ? "" : "s"} · slug: {c.slug}
                  </span>
                </div>
              </form>
              <form action={doDeleteCat} className="mt-2">
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold"
                >
                  Delete category
                </button>
              </form>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Sub-categories
              </h3>
              <div className="space-y-2 mb-4">
                {c.subcategories.length === 0 && (
                  <p className="text-sm text-slate-500 italic">No sub-categories yet.</p>
                )}
                {c.subcategories.map((s) => (
                  <div key={s.id} className="bg-white rounded-lg border border-slate-200 p-3">
                    <form action={doUpdateSub} className="grid md:grid-cols-4 gap-2 items-end">
                      <input type="hidden" name="id" value={s.id} />
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          defaultValue={s.name}
                          className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Icon</label>
                        <input
                          name="icon"
                          type="text"
                          maxLength={4}
                          defaultValue={s.icon ?? ""}
                          className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Blurb</label>
                        <input
                          name="blurb"
                          type="text"
                          defaultValue={s.blurb ?? ""}
                          className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 invisible" aria-hidden>Save</label>
                        <button
                          type="submit"
                          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-4 py-1.5 rounded-full transition"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    <form action={doDeleteSub} className="mt-2">
                      <input type="hidden" name="id" value={s.id} />
                      <button type="submit" className="text-xs text-red-600 hover:text-red-700 font-semibold">
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
              </div>
              <form action={doCreateSub} className="grid md:grid-cols-4 gap-2 items-end">
                <input type="hidden" name="categoryId" value={c.id} />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Sub-category name"
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Icon</label>
                  <input
                    name="icon"
                    type="text"
                    maxLength={4}
                    placeholder="🏗️"
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Blurb</label>
                  <input
                    name="blurb"
                    type="text"
                    placeholder="Short description"
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-4 py-1.5 rounded-full"
                >
                  + Add
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
