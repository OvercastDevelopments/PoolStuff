import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import ProductForm, { type CategoryOption, type ProductInitial } from "../ProductForm";
import { updateProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

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

  const initial: ProductInitial = {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId,
    price: product.price,
    blurb: product.blurb,
    isNew: product.isNew,
    imageUrl: product.imageUrl,
  };

  const update = updateProduct.bind(null, product.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-sky-600 hover:text-sky-700">
          ← All products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Edit product</h1>
      </div>
      <ProductForm mode="edit" categories={categories} action={update} initial={initial} />
    </div>
  );
}
