/*
  Warnings:

  - You are about to drop the `Base` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Occurrence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Base" DROP CONSTRAINT "Base_rigId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_baseId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_userId_fkey";

-- DropForeignKey
ALTER TABLE "man_hours" DROP CONSTRAINT "man_hours_baseId_fkey";

-- DropTable
DROP TABLE "Base";

-- DropTable
DROP TABLE "Occurrence";

-- CreateTable
CREATE TABLE "bases" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state" "UF" NOT NULL,
    "rigId" UUID,

    CONSTRAINT "bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occurrences" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "OccurrenceCategory",
    "baseId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "type" "OccurrenceType" NOT NULL,
    "is_absent" BOOLEAN NOT NULL,
    "nature" "Nature" NOT NULL,

    CONSTRAINT "occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bases_name_key" ON "bases"("name");

-- AddForeignKey
ALTER TABLE "bases" ADD CONSTRAINT "bases_rigId_fkey" FOREIGN KEY ("rigId") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "man_hours" ADD CONSTRAINT "man_hours_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
