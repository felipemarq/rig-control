-- AlterTable
ALTER TABLE "occurrences" ADD COLUMN     "client_id" UUID;

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
