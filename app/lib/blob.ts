import { del, put } from "@vercel/blob";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Uploads to Vercel Blob under `${folder}/uuid.ext` and returns the public URL.
 * Returns null for an empty file input, which is what an untouched <input
 * type="file"> submits.
 */
export async function uploadImage(
  file: File | null | undefined,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop() ?? "jpg";
  const safe = `${folder}/${crypto.randomUUID()}.${ext.toLowerCase()}`;
  const blob = await put(safe, file, {
    access: "public",
    addRandomSuffix: false,
    ...(blobToken ? { token: blobToken } : {}),
  });
  return blob.url;
}

export async function deleteImage(imageUrl: string | null | undefined) {
  if (!imageUrl) return;
  try {
    await del(imageUrl, blobToken ? { token: blobToken } : undefined);
  } catch {
    // Ignore — blob may have been removed manually
  }
}
