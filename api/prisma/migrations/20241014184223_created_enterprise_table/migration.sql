-- AlterTable
ALTER TABLE "users" ADD COLUMN     "enterprise_id" UUID;

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo_image_path" TEXT,
    "mainColor" TEXT NOT NULL DEFAULT '#1c7b7b',

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_name_key" ON "Enterprise"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
