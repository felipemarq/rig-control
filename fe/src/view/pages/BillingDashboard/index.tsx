import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import "swiper/css";
import { FilterSheet } from "@/view/components/FilterSheet";
import { StatboxContainer } from "./components/StatboxContainer";
import { Header } from "@/view/components/Header.tsx";
import { BarChartCard } from "./components/BarChartCard";
import { Spinner } from "@/view/components/Spinner";
import { RigDetailsCard } from "./components/RigDetailsCard";

export const description = "A multiple bar chart";

const BillingDashboard = () => {
  return (
    <BillingDashboardProvider>
      <BillingDashboardContext.Consumer>
        {({ handleApplyFilters, isFetchingBillings, selectedRig }) => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Dashboard de Faturamento"
            >
              <div className="flex gap-2 items-center">
                <FilterSheet
                  onApplyFilters={handleApplyFilters}
                  isLoading={isFetchingBillings}
                />
              </div>
            </Header>

            {isFetchingBillings && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}

            {!isFetchingBillings && (
              <div>
                <StatboxContainer />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ">
                  <BarChartCard />
                  {selectedRig && <RigDetailsCard />}
                </div>
              </div>
            )}
          </div>
        )}
      </BillingDashboardContext.Consumer>
    </BillingDashboardProvider>
  );
};

export default BillingDashboard;
