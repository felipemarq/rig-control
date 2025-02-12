/*
  Warnings:

  - You are about to drop the column `rigId` on the `bases` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contractId]` on the table `bases` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contractId` to the `bases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bases" DROP CONSTRAINT "bases_rigId_fkey";

-- AlterTable
ALTER TABLE "bases" DROP COLUMN "rigId",
ADD COLUMN     "contractId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bases_contractId_key" ON "bases"("contractId");

-- AddForeignKey
ALTER TABLE "bases" ADD CONSTRAINT "bases_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
