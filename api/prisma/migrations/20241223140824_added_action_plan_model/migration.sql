-- CreateTable
CREATE TABLE "period_action_plans" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "period_id" UUID NOT NULL,

    CONSTRAINT "period_action_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period_action_plan_items" (
    "id" UUID NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "assignee" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "action_plan_id" UUID NOT NULL,

    CONSTRAINT "period_action_plan_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "period_action_plans" ADD CONSTRAINT "period_action_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period_action_plans" ADD CONSTRAINT "period_action_plans_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period_action_plan_items" ADD CONSTRAINT "period_action_plan_items_action_plan_id_fkey" FOREIGN KEY ("action_plan_id") REFERENCES "period_action_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
