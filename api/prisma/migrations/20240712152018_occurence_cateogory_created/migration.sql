-- CreateEnum
CREATE TYPE "OccurrenceCategory" AS ENUM ('TAR', 'TOR');

-- AlterTable
ALTER TABLE "Occurrence" ADD COLUMN     "category" "OccurrenceCategory";
