-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PeriodClassification" ADD VALUE 'COMMERCIALLY_STOPPED';
ALTER TYPE "PeriodClassification" ADD VALUE 'STAND_BY';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "period_type" ADD VALUE 'COMMERCIALLY_STOPPED';
ALTER TYPE "period_type" ADD VALUE 'STAND_BY';

-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "standby_hour_tax" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "billings" ADD COLUMN     "standby_hour_amount" DOUBLE PRECISION;
