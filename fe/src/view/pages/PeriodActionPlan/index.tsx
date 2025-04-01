import {
  PeriodActionPlansContext,
  PeriodActionPlansProvider,
} from "./components/PeriodActionPlansContext";
import { PeriodActionPlansContainer } from "./components/PeriodActionPlansContainer";
import { NewPeriodActionPlanModal } from "./components/NewPeriodActionPlanModal";
import { EditPeriodActionPlanModal } from "./components/EditPeriodActionPlanModal";
import { Header } from "@/view/components/Header";
import { StatboxContainer } from "./components/StatboxContainer";
import { PeriodsDetailsPieChartCard } from "./components/PeriodsDetailsPieChartCard";
import { BarChartByRig } from "./components/BarChartByRig";

const PeriodActionPlans = () => {
  return (
    <PeriodActionPlansProvider>
      <PeriodActionPlansContext.Consumer>
        {({ isNewPeriodActionPlanModalOpen, actionPlanBeingSeen }) => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Planos de Ação"
            >
              <div className="flex gap-2 items-center">
                {/*  <FilterSheet
                              onApplyFilters={handleApplyFilters}
                              isLoading={isFetchingChecklists}
                            /> */}
              </div>
            </Header>

            <div>
              <StatboxContainer />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
                <PeriodsDetailsPieChartCard />
                <BarChartByRig />
                <PeriodActionPlansContainer />
              </div>
            </div>

            {isNewPeriodActionPlanModalOpen && <NewPeriodActionPlanModal />}
            {actionPlanBeingSeen && <EditPeriodActionPlanModal />}
          </div>
        )}
      </PeriodActionPlansContext.Consumer>
    </PeriodActionPlansProvider>
  );
};

export default PeriodActionPlans;
