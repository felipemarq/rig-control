-- AlterTable
ALTER TABLE "files" ADD COLUMN     "period_action_plan_id" UUID;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_period_action_plan_id_fkey" FOREIGN KEY ("period_action_plan_id") REFERENCES "period_action_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
