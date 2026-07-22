"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

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
}

export async function createSubcategory(categoryId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim() || null;
  const blurb = String(formData.get("blurb") ?? "").trim() || null;
  if (!name) return;
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
      icon,
      blurb,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
  });
  invalidate();
}

export async function updateSubcategory(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim() || null;
  const blurb = String(formData.get("blurb") ?? "").trim() || null;
  if (!name) return;
  const current = await prisma.subcategory.findUnique({ where: { id } });
  if (!current) return;
  const slug =
    current.name === name ? current.slug : await ensureUniqueSubSlug(current.categoryId, name, id);
  await prisma.subcategory.update({
    where: { id },
    data: { name, slug, icon, blurb },
  });
  invalidate();
}

export async function deleteSubcategory(id: string) {
  const count = await prisma.product.count({ where: { subcategoryId: id } });
  if (count > 0) {
    throw new Error(
      `Cannot delete sub-category: ${count} product${count === 1 ? " uses" : "s use"} it. Reassign them first.`
    );
  }
  await prisma.subcategory.delete({ where: { id } });
  invalidate();
}
