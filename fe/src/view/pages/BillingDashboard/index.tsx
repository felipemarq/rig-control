import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import "swiper/css";
import { FilterSheet } from "@/view/components/FilterSheet";
import { StatboxContainer } from "./components/StatboxContainer";

import { EditConfigModal } from "./modals/EditConfigModal";
import { BagdeStatus } from "@/view/components/BagdeStatus";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { BarChartCard } from "./components/BarChartCard";
import { RigBillingConfigListCard } from "./components/RigBillingConfigListCard";

export const description = "A multiple bar chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const BillingDashboard = () => {
  return (
    <BillingDashboardProvider>
      <BillingDashboardContext.Consumer>
        {({ handleApplyFilters, isFetchingBillings, configBeingEdited }) => (
          <div>
            <div className="flex justify-between p-4">
              <BagdeStatus displayRig={false} />
              <FilterSheet
                onApplyFilters={handleApplyFilters}
                isLoading={isFetchingBillings}
              />
            </div>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <StatboxContainer />

                  <Card className="col-span-12 row-span-3 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-auto">
                    <CardHeader>
                      <CardTitle>Bar Chart - Multiple</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                          />
                          <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            radius={4}
                          />
                          <Bar
                            dataKey="mobile"
                            fill="var(--color-mobile)"
                            radius={4}
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                      <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month{" "}
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                      </div>
                    </CardFooter>
                  </Card>
                  <BarChartCard />
                  <RigBillingConfigListCard />
                </div>
              </main>
            </div>
            {configBeingEdited && <EditConfigModal />}
          </div>
        )}
      </BillingDashboardContext.Consumer>
    </BillingDashboardProvider>
  );
};
