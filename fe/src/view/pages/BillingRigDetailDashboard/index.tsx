import { BillingRigDetailDashboardContext, BillingRigDetailDashboardProvider } from "./BillingRigDetailDashboardContext";
import "swiper/css";
import { CustomFilterSheet } from "@/view/components/CustomFilterSheet";
import { StatboxContainer } from "./components/StatboxContainer";
import { LineChartCard } from "./components/LineChartCard";
import { BagdeStatus } from "@/view/components/BagdeStatus";
import { TableCard } from "./components/TableCard";

export const BillingRigDetailDashboard = () => {
  return (
    <BillingRigDetailDashboardProvider>
      <BillingRigDetailDashboardContext.Consumer>
        {({ handleApplyFilters, isFetchingBilling }) => (
          <div className="overflow-y-auto">
            <div className="flex justify-between items-center p-4">
              <BagdeStatus displayRig />
              <CustomFilterSheet isLoading={isFetchingBilling} onApplyFilters={handleApplyFilters} />
            </div>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <StatboxContainer />
                  <TableCard />
                  <LineChartCard />
                </div>
              </main>
            </div>
          </div>
        )}
      </BillingRigDetailDashboardContext.Consumer>
    </BillingRigDetailDashboardProvider>
  );
};

export default BillingRigDetailDashboard;
