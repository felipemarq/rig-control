-- CreateTable
CREATE TABLE "man_hours" (
    "id" UUID NOT NULL,
    "baseId" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "man_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "man_hours_baseId_year_month_key" ON "man_hours"("baseId", "year", "month");

-- AddForeignKey
ALTER TABLE "man_hours" ADD CONSTRAINT "man_hours_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base"("id") ON DELETE CASCADE ON UPDATE CASCADE;
