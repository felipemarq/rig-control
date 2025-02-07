-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "commercially_stopped_tax" DOUBLE PRECISION DEFAULT 35000;

-- AlterTable
ALTER TABLE "billings" ADD COLUMN     "commercially_stopped_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;
