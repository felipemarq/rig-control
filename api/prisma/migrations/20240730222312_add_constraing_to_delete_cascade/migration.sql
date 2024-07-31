-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_occurrence_id_fkey";

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
