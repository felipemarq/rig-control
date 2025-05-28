import {
  SmsDashboardContext,
  SmsDashboardProvider,
} from "./SmsDashboardContext";

import { StatboxContainer } from "./Components/StatboxContainer";
import { BarChartByType } from "./Components/BarChartByType";
import { PieChartByNature } from "./Components/PieChartByNature";
import { OccurrenceFiltersSheet } from "@/view/components/OccurrenceFiltersSheet";
import { Spinner } from "@/view/components/Spinner";
import { PedingActionPlans } from "./Components/PedingActionPlans";
import { TorOccurrencesBarChartCard } from "./Components/TorOccurrencesBarChartCard";
import { TarOccurrencesBarChartCard } from "./Components/TarOccurrencesBarChartCard";
import { Header } from "@/view/components/Header";
import { EditOccurrenceActionModal } from "./Components/EditOccurrenceActionModal";

export default function SmsDashboard() {
  return (
    <SmsDashboardProvider>
      <SmsDashboardContext.Consumer>
        {({ isFetchingOccurrences, occurrenceActionBeingSeen }) => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Dashboard de Saúde, Meio Ambiente e Segurança (SMS)"
            >
              <div className="flex gap-2 items-center">
                <OccurrenceFiltersSheet />
              </div>
            </Header>

            {isFetchingOccurrences && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}

            {!isFetchingOccurrences && (
              <div>
                <StatboxContainer />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
                  <BarChartByType />

                  <PieChartByNature />

                  <TorOccurrencesBarChartCard />

                  <TarOccurrencesBarChartCard />

                  {/*  <TfsaOccurrencesBarChartCard /> */}

                  <PedingActionPlans />
                </div>
                {occurrenceActionBeingSeen && <EditOccurrenceActionModal />}
                {/*  <AreaChartByMonth /> */}
              </div>
            )}
          </div>
        )}
      </SmsDashboardContext.Consumer>
    </SmsDashboardProvider>
  );
}
