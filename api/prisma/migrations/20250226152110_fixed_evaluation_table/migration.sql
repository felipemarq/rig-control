/*
  Warnings:

  - You are about to drop the column `goal` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `totalWeight` on the `Evaluation` table. All the data in the column will be lost.
  - Added the required column `totalPoints` to the `Checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWeight` to the `Checklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checklist" ADD COLUMN     "goal" DOUBLE PRECISION NOT NULL DEFAULT 60,
ADD COLUMN     "totalPoints" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalWeight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "goal",
DROP COLUMN "totalPoints",
DROP COLUMN "totalWeight";
