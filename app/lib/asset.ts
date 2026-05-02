// Prepend the configured basePath (e.g. "/PoolStuff" on GitHub Pages) to a public asset path.
// Use this for any <Image src> / <img src> that points at /public, since next/image does not
// auto-prepend basePath when output: 'export' is set.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
