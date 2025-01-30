-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "mobilizationOut" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "billings" ADD COLUMN     "mobilization_out_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;
