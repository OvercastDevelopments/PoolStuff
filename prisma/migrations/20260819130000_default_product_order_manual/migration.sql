-- The catalog was already hand-ordered through Product.sortOrder before this
-- feature existed (89 of 167 products carry a non-zero position). Defaulting
-- categories to ALPHABETICAL would have silently re-sorted almost every list,
-- so the default becomes MANUAL, which reproduces the pre-existing ordering
-- (sortOrder ASC, then name ASC) exactly.

ALTER TABLE "Category" ALTER COLUMN "productOrder" SET DEFAULT 'MANUAL';

UPDATE "Category" SET "productOrder" = 'MANUAL' WHERE "productOrder" = 'ALPHABETICAL';
