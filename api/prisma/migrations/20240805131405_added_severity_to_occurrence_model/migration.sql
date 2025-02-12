-- CreateEnum
CREATE TYPE "OccurrenceSeverity" AS ENUM ('MINOR', 'MODERATE', 'SEVERE');

-- AlterTable
ALTER TABLE "occurrences" ADD COLUMN     "severity" "OccurrenceSeverity";
