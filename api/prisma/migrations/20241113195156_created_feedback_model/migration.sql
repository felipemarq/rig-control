-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('SUGESTION', 'PROBLEM', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('RECEIVED', 'IN_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'NO_ACTION_NEEDED', 'PENDING');

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" UUID NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'RECEIVED',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
