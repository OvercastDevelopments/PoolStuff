"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { isOrderMode } from "../../lib/productOrder";
import { deleteImage, uploadImage } from "../../lib/blob";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function ensureUniqueCategorySlug(name: string, existingId?: string) {
  const base = slugify(name) || "category";
  let slug = base;
  let n = 1;
  while (true) {
    const found = await prisma.category.findUnique({ where: { slug } });
    if (!found || found.id === existingId) return slug;
    n++;
    slug = `${base}-${n}`;
  }
}

async function ensureUniqueSubSlug(categoryId: string, name: string, existingId?: string) {
  const base = slugify(name) || "sub";
  let slug = base;
  let n = 1;
  while (true) {
    const found = await prisma.subcategory.findUnique({
      where: { categoryId_slug: { categoryId, slug } },
    });
    if (!found || found.id === existingId) return slug;
    n++;
    slug = `${base}-${n}`;
  }
}

function invalidate() {
  revalidatePath("/products");
  revalidatePath("/new-products");
  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const heroBlurb = String(formData.get("heroBlurb") ?? "").trim() || null;
  if (!name) return;
  const slug = await ensureUniqueCategorySlug(name);
  const max = await prisma.category.aggregate({ _max: { sortOrder: true } });
  await prisma.category.create({
    data: {
      name,
      slug,
      heroTitle: name,
      heroBlurb,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
  });
  invalidate();
  redirect("/admin/categories?saved=create");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const heroTitle = String(formData.get("heroTitle") ?? "").trim() || null;
  const heroBlurb = String(formData.get("heroBlurb") ?? "").trim() || null;
  if (!name) return;
  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) return;
  const slug = current.name === name ? current.slug : await ensureUniqueCategorySlug(name, id);
  await prisma.category.update({
    where: { id },
    data: { name, slug, heroTitle, heroBlurb },
  });
  invalidate();
  redirect("/admin/categories?saved=update");
}

export async function deleteCategory(id: string) {
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    throw new Error(
      `Cannot delete category: ${count} product${count === 1 ? " uses" : "s use"} it. Reassign them first.`
    );
  }
  await prisma.category.delete({ where: { id } });
  invalidate();
  redirect("/admin/categories?saved=delete");
}

export async function createSubcategory(categoryId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const blurb = String(formData.get("blurb") ?? "").trim() || null;
  if (!name) return;
  const imageUrl = await uploadImage(formData.get("image") as File | null, "subcategories");
  const slug = await ensureUniqueSubSlug(categoryId, name);
  const max = await prisma.subcategory.aggregate({
    _max: { sortOrder: true },
    where: { categoryId },
  });
  await prisma.subcategory.create({
    data: {
      categoryId,
      name,
      slug,
      imageUrl,
      blurb,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
  });
  invalidate();
  redirect("/admin/categories?saved=create");
}

export async function updateSubcategory(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const blurb = String(formData.get("blurb") ?? "").trim() || null;
  if (!name) return;
  const current = await prisma.subcategory.findUnique({ where: { id } });
  if (!current) return;
  const slug =
    current.name === name ? current.slug : await ensureUniqueSubSlug(current.categoryId, name, id);

  const uploaded = await uploadImage(formData.get("image") as File | null, "subcategories");
  const removeImage = formData.get("removeImage") === "on";
  let imageUrl = current.imageUrl;
  if (uploaded) {
    await deleteImage(current.imageUrl);
    imageUrl = uploaded;
  } else if (removeImage) {
    await deleteImage(current.imageUrl);
    imageUrl = null;
  }

  await prisma.subcategory.update({
    where: { id },
    data: { name, slug, imageUrl, blurb },
  });
  invalidate();
  redirect("/admin/categories?saved=update");
}

export async function deleteSubcategory(id: string) {
  const count = await prisma.product.count({ where: { subcategoryId: id } });
  if (count > 0) {
    throw new Error(
      `Cannot delete sub-category: ${count} product${count === 1 ? " uses" : "s use"} it. Reassign them first.`
    );
  }
  const current = await prisma.subcategory.findUnique({ where: { id } });
  await deleteImage(current?.imageUrl);
  await prisma.subcategory.delete({ where: { id } });
  invalidate();
  redirect("/admin/categories?saved=delete");
}

export async function updateCategoryOrderMode(id: string, formData: FormData) {
  const mode = String(formData.get("productOrder") ?? "");
  if (!isOrderMode(mode)) return;

  // Entering MANUAL: normalise positions to a dense 1..N run in the order the
  // category *currently* displays. This catalog arrived with a mix of 0s and
  // hand-set values, so normalising keeps the visible order identical while
  // giving the Reorder screen clean positions to move around.
  if (mode === "MANUAL") {
    const products = await prisma.product.findMany({
      where: { categoryId: id },
      select: { id: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    if (products.length > 0) {
      await prisma.$transaction(
        products.map((p, i) =>
          prisma.product.update({ where: { id: p.id }, data: { sortOrder: i + 1 } })
        )
      );
    }
  }

  await prisma.category.update({ where: { id }, data: { productOrder: mode } });
  invalidate();
  redirect("/admin/categories?saved=update");
}

export async function moveProduct(productId: string, direction: "up" | "down") {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, categoryId: true },
  });
  if (!product) return;

  const siblings = await prisma.product.findMany({
    where: { categoryId: product.categoryId },
    select: { id: true, name: true, sortOrder: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  const index = siblings.findIndex((p) => p.id === productId);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= siblings.length) return;

  const reordered = [...siblings];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

  // Rewrite the whole run so positions stay dense and gap-free even if the
  // stored values had duplicates or holes.
  await prisma.$transaction(
    reordered.map((p, i) =>
      prisma.product.update({ where: { id: p.id }, data: { sortOrder: i + 1 } })
    )
  );
  invalidate();
}
