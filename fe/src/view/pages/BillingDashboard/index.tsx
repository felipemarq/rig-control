import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import "swiper/css";
import { FilterSheet } from "@/view/components/FilterSheet";
import { StatboxContainer } from "./components/StatboxContainer";
import { EditConfigModal } from "./modals/EditConfigModal";
import { BagdeStatus } from "@/view/components/BagdeStatus";
import { BarChartCard } from "./components/BarChartCard";

export const description = "A multiple bar chart";

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

                  <BarChartCard />
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
