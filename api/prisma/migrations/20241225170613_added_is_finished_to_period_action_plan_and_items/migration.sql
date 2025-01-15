-- AlterTable
ALTER TABLE "period_action_plan_items" ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "period_action_plans" ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;
