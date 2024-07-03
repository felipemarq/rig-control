-- CreateEnum
CREATE TYPE "OccurrenceType" AS ENUM ('HEALTH', 'ENVIRONMENT', 'SAFETY');

-- CreateEnum
CREATE TYPE "Nature" AS ENUM ('ACCIDENT', 'INCIDENT');

-- CreateTable
CREATE TABLE "Base" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rigId" UUID,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "baseId" UUID NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "type" "OccurrenceType" NOT NULL,
    "is_absent" BOOLEAN NOT NULL,
    "nature" "Nature" NOT NULL,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occurrence_action" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "responsible" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "occurrence_action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Base_name_key" ON "Base"("name");

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_rigId_fkey" FOREIGN KEY ("rigId") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base"("id") ON DELETE CASCADE ON UPDATE CASCADE;
