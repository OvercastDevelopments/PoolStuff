-- CreateEnum
CREATE TYPE "ProductOrderMode" AS ENUM ('ALPHABETICAL', 'NATURAL', 'MANUAL');

-- AlterTable
ALTER TABLE "Category"
  ADD COLUMN "productOrder" "ProductOrderMode" NOT NULL DEFAULT 'ALPHABETICAL';
