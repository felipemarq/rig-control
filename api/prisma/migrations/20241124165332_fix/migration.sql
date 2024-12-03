/*
  Warnings:

  - You are about to drop the column `comertial_hours` on the `efficiencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "efficiencies" DROP COLUMN "comertial_hours",
ADD COLUMN     "commercial_hours" DOUBLE PRECISION;
