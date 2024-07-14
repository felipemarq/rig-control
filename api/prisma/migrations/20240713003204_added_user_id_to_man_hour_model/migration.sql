/*
  Warnings:

  - Added the required column `userId` to the `man_hours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "man_hours" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "man_hours" ADD CONSTRAINT "man_hours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
