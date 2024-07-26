/*
  Warnings:

  - Added the required column `state` to the `occurrences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrences" ADD COLUMN     "state" "UF" NOT NULL;
