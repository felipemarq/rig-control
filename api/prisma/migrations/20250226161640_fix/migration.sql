/*
  Warnings:

  - Added the required column `rating` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "rating" INTEGER NOT NULL;
