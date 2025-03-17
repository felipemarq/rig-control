/*
  Warnings:

  - Added the required column `number` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "number" INTEGER NOT NULL;
