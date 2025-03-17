-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ChecklistItemCategory" ADD VALUE 'SGI';
ALTER TYPE "ChecklistItemCategory" ADD VALUE 'OP';
ALTER TYPE "ChecklistItemCategory" ADD VALUE 'INT';
ALTER TYPE "ChecklistItemCategory" ADD VALUE 'MANT';
ALTER TYPE "ChecklistItemCategory" ADD VALUE 'INT_MANT';
ALTER TYPE "ChecklistItemCategory" ADD VALUE 'LOG';

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "checklist_id" UUID;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
