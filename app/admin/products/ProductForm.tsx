"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type CategoryOption = {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
};

export type ProductInitial = {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId: string | null;
  price: string;
  blurb: string;
  isNew: boolean;
  imageUrl: string | null;
};

type Props = {
  mode: "create" | "edit";
  categories: CategoryOption[];
  action: (formData: FormData) => Promise<void>;
  initial?: ProductInitial;
};

export default function ProductForm({ mode, categories, action, initial }: Props) {
  const [categoryId, setCategoryId] = useState<string>(initial?.categoryId ?? categories[0]?.id ?? "");
  const [subcategoryId, setSubcategoryId] = useState<string>(initial?.subcategoryId ?? "none");
  const [isNew, setIsNew] = useState<boolean>(initial?.isNew ?? false);
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.imageUrl ?? null);

  const subOptions = useMemo(() => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.subcategories ?? [];
  }, [categories, categoryId]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initial?.name}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="categoryId" className="block text-sm font-semibold text-slate-700 mb-1">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategoryId("none");
            }}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subcategoryId" className="block text-sm font-semibold text-slate-700 mb-1">
            Sub-category
          </label>
          <select
            id="subcategoryId"
            name="subcategoryId"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="none">— None —</option>
            {subOptions.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-1">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="text"
          defaultValue={initial?.price ?? "Contact for quote"}
          placeholder='e.g. $199 or "Contact for quote"'
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div>
        <label htmlFor="blurb" className="block text-sm font-semibold text-slate-700 mb-1">
          Blurb
        </label>
        <textarea
          id="blurb"
          name="blurb"
          required
          rows={4}
          defaultValue={initial?.blurb}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Image</label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0">
            {imagePreview && !removeImage && (
              <Image
                src={imagePreview}
                alt="preview"
                fill
                sizes="128px"
                unoptimized
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={onFile}
              className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
            />
            {mode === "edit" && initial?.imageUrl && (
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="removeImage"
                  checked={removeImage}
                  onChange={(e) => {
                    setRemoveImage(e.target.checked);
                    if (e.target.checked) setImagePreview(null);
                  }}
                />
                Remove current image
              </label>
            )}
            <div className="text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">
                For best results, upload a landscape 4:3 photo.
              </p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Recommended dimensions: <strong>1600 × 1200 px</strong> (minimum 1200 × 900)</li>
                <li>Aspect ratio: <strong>4:3 landscape</strong> — other ratios will be centre-cropped to fit the card</li>
                <li>Format: JPG or PNG (WebP also supported)</li>
                <li>Max file size: 10 MB (keep under 500 KB where possible for fast page loads)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isNew"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-semibold text-slate-700">
            Show on the New Products page
          </span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2.5 rounded-full transition"
        >
          {mode === "create" ? "Create product" : "Save changes"}
        </button>
        <Link
          href="/admin/products"
          className="text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
