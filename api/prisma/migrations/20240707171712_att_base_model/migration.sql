/*
  Warnings:

  - Made the column `state` on table `Base` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Base" ALTER COLUMN "state" SET NOT NULL;
