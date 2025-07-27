/*
  Warnings:

  - The values [Laptos] on the enum `Categoria` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categoria_new" AS ENUM ('Laptops', 'CPU', 'Mouses', 'Teclados');
ALTER TABLE "Producto" ALTER COLUMN "categoria" TYPE "Categoria_new" USING ("categoria"::text::"Categoria_new");
ALTER TYPE "Categoria" RENAME TO "Categoria_old";
ALTER TYPE "Categoria_new" RENAME TO "Categoria";
DROP TYPE "Categoria_old";
COMMIT;
