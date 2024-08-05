/*
  Warnings:

  - Added the required column `occurrence_id` to the `occurrence_action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence_action" ADD COLUMN     "occurrence_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "occurrence_action" ADD CONSTRAINT "occurrence_action_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
