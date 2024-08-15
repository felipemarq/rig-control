import { Select } from "@/view/components/Select";
import { Header } from "@/view/components/Header";
import { StatboxContainer } from "./components/StatboxContainer";
import { TorOccurrencesBarChartCard } from "./components/TorOccurrencesBarChartCard";
import {
  ManHourDashboardContext,
  ManHourDashboardProvider,
} from "./ManHourDashboardContext";
import { Button } from "@/view/components/Button";

import { TarOccurrencesBarChartCard } from "./components/TarOccurrencesBarChartCard";
import { TfsaOccurrencesBarChartCard } from "./components/TfsaOccurrencesBarChartCard";
import { TfcaOccurrencesBarChartCard } from "./components/TfcaOccurrencesBarChartCard";

export const ManHoursDashboard = () => {
  return (
    <ManHourDashboardProvider>
      <ManHourDashboardContext.Consumer>
        {({
          bases,
          handleChangeBaseId,
          isFetchingBases,
          selectedBaseId,
          applyFilters,
        }) => (
          <div className="overflow-y-auto w-full">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Dashboard por Base"
            >
              <div className="flex justify-center items-start gap-3">
                <div className="w-52">
                  <Select
                    placeholder="Base"
                    value={selectedBaseId}
                    isLoading={isFetchingBases}
                    onChange={(value) => handleChangeBaseId(value)}
                    options={bases.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))}
                  />
                </div>
                <div>
                  <Button
                    onClick={applyFilters}
                    disabled={selectedBaseId === ""}
                  >
                    Aplicar Filtro
                  </Button>
                </div>
              </div>
            </Header>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />

                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[60px]">
                  <TorOccurrencesBarChartCard />
                  <TarOccurrencesBarChartCard />
                  <TfsaOccurrencesBarChartCard />
                  <TfcaOccurrencesBarChartCard />
                </div>
              </main>
            </div>
          </div>
        )}
      </ManHourDashboardContext.Consumer>
    </ManHourDashboardProvider>
  );
};
