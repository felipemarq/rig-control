import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WellsHeader } from "./components/WellsHeader";
import { WellsTable } from "./components/WellsTable";

export default function WellsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <WellsHeader />
      <Card>
        <CardContent className="p-6">
          <Suspense fallback={<WellsTableSkeleton />}>
            <WellsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function WellsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
