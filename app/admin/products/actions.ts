"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { deleteImage, uploadImage as uploadToBlob } from "../../lib/blob";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function ensureUniqueSlug(baseName: string, existingId?: string) {
  const base = slugify(baseName) || "product";
  let slug = base;
  let n = 1;
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === existingId) return slug;
    n++;
    slug = `${base}-${n}`;
  }
}

const uploadImage = (file: File | null | undefined) => uploadToBlob(file, "products");

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const subcategoryIdRaw = String(formData.get("subcategoryId") ?? "");
  const price = String(formData.get("price") ?? "Contact for quote").trim();
  const blurb = String(formData.get("blurb") ?? "").trim();
  const isNew = formData.get("isNew") === "on";
  const image = formData.get("image") as File | null;

  if (!name || !categoryId || !blurb) {
    throw new Error("Name, category, and blurb are required.");
  }

  const subcategoryId = subcategoryIdRaw && subcategoryIdRaw !== "none" ? subcategoryIdRaw : null;
  const slug = await ensureUniqueSlug(name);
  const imageUrl = await uploadImage(image);

  await prisma.product.create({
    data: {
      name,
      slug,
      categoryId,
      subcategoryId,
      price: price || "Contact for quote",
      blurb,
      isNew,
      imageUrl,
    },
  });

  revalidatePath("/products");
  revalidatePath("/new-products");
  redirect("/admin/products?saved=create");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const subcategoryIdRaw = String(formData.get("subcategoryId") ?? "");
  const price = String(formData.get("price") ?? "Contact for quote").trim();
  const blurb = String(formData.get("blurb") ?? "").trim();
  const isNew = formData.get("isNew") === "on";
  const removeImage = formData.get("removeImage") === "on";
  const image = formData.get("image") as File | null;

  if (!name || !categoryId || !blurb) {
    throw new Error("Name, category, and blurb are required.");
  }

  const subcategoryId = subcategoryIdRaw && subcategoryIdRaw !== "none" ? subcategoryIdRaw : null;
  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) throw new Error("Product not found.");

  const slug = current.name === name ? current.slug : await ensureUniqueSlug(name, id);

  let imageUrl: string | null | undefined = undefined;
  if (image && image.size > 0) {
    if (current.imageUrl) await deleteImage(current.imageUrl);
    imageUrl = await uploadImage(image);
  } else if (removeImage && current.imageUrl) {
    await deleteImage(current.imageUrl);
    imageUrl = null;
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      categoryId,
      subcategoryId,
      price: price || "Contact for quote",
      blurb,
      isNew,
      ...(imageUrl !== undefined ? { imageUrl } : {}),
    },
  });

  revalidatePath("/products");
  revalidatePath("/new-products");
  redirect("/admin/products?saved=update");
}

export async function deleteProduct(id: string) {
  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) return;
  if (current.imageUrl) await deleteImage(current.imageUrl);
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/new-products");
  revalidatePath("/admin/products");
  redirect("/admin/products?saved=delete");
}
