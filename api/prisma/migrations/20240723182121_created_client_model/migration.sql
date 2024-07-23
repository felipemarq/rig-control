-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "client_id" UUID;

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo_image_path" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
