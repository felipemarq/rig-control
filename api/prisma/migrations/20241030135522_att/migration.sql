/*
  Warnings:

  - You are about to drop the `UserNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_notification_id_fkey";

-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_user_id_fkey";

-- DropTable
DROP TABLE "UserNotification";

-- CreateTable
CREATE TABLE "users_notifications" (
    "user_id" UUID NOT NULL,
    "notification_id" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_notifications_pkey" PRIMARY KEY ("user_id","notification_id")
);

-- AddForeignKey
ALTER TABLE "users_notifications" ADD CONSTRAINT "users_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_notifications" ADD CONSTRAINT "users_notifications_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
