export type OrderMode = "ALPHABETICAL" | "NATURAL" | "MANUAL";

export const ORDER_MODES: { value: OrderMode; label: string; hint: string }[] = [
  {
    value: "ALPHABETICAL",
    label: "Alphabetical",
    hint: "A–Z by product name. Ignores any positions set on the Reorder screen.",
  },
  {
    value: "NATURAL",
    label: "Numeric order",
    hint: 'A–Z, but numbers in names count as numbers — "Disc 2" comes before "Disc 10", not after it.',
  },
  {
    value: "MANUAL",
    label: "Manual",
    hint: "The current site order — you choose it on the Reorder screen. This is the default, because this catalog was already hand-ordered.",
  },
];

export function isOrderMode(value: unknown): value is OrderMode {
  return value === "ALPHABETICAL" || value === "NATURAL" || value === "MANUAL";
}

type Sortable = { name: string; sortOrder?: number };

/**
 * Comparator for a category's chosen ordering mode.
 *
 * MANUAL falls back to name when two products share a sortOrder, which is the
 * case for every product until an admin reorders them — so an untouched
 * MANUAL category still reads alphabetically rather than in random row order.
 */
export function compareBy(mode: OrderMode) {
  const byName = (a: Sortable, b: Sortable) => a.name.localeCompare(b.name);
  const byNaturalName = (a: Sortable, b: Sortable) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });

  if (mode === "NATURAL") return byNaturalName;
  if (mode === "MANUAL") {
    return (a: Sortable, b: Sortable) =>
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || byName(a, b);
  }
  return byName;
}

export function sortProducts<T extends Sortable>(products: T[], mode: OrderMode): T[] {
  return [...products].sort(compareBy(mode));
}
