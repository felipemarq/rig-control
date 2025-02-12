-- AlterTable
ALTER TABLE "files" ADD COLUMN     "occurrence_action_id" UUID;

-- AlterTable
ALTER TABLE "occurrence_action" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_occurrence_action_id_fkey" FOREIGN KEY ("occurrence_action_id") REFERENCES "occurrence_action"("id") ON DELETE CASCADE ON UPDATE CASCADE;
