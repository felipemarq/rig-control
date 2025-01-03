/*
  Warnings:

  - Added the required column `rig_id` to the `period_action_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "period_action_plans" ADD COLUMN     "rig_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "period_action_plans" ADD CONSTRAINT "period_action_plans_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
