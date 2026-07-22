import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import ProductForm, { type CategoryOption } from "../ProductForm";
import { createProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const rows = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      subcategories: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: { id: true, name: true },
      },
    },
  });
  const categories: CategoryOption[] = rows.map((c) => ({
    id: c.id,
    name: c.name,
    subcategories: c.subcategories,
  }));

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-sky-600 hover:text-sky-700">
          ← All products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Add product</h1>
      </div>
      <ProductForm mode="create" categories={categories} action={createProduct} />
    </div>
  );
}
