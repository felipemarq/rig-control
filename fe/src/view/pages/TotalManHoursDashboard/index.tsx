import { Header } from "@/view/components/Header";
import { StatboxContainer } from "./components/StatboxContainer";
import { TorOccurrencesBarChartCard } from "./components/TorOccurrencesBarChartCard";
import {
  TotalManHoursDashboardContext,
  TotalManHoursDashboardProvider,
} from "./TotalManHoursDashboardContext";
import { TarOccurrencesBarChartCard } from "./components/TarOccurrencesBarChartCard";
import { TfsaOccurrencesBarChartCard } from "./components/TfsaOccurrencesBarChartCard";
import { TfcaOccurrencesBarChartCard } from "./components/TfcaOccurrencesBarChartCard";

export const TotalManHoursDashboard = () => {
  return (
    <TotalManHoursDashboardProvider>
      <TotalManHoursDashboardContext.Consumer>
        {() => (
          <div className="overflow-y-auto w-full">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Dashboard Geral"
            ></Header>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />

                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[50px]">
                  <TfsaOccurrencesBarChartCard />
                  <TfcaOccurrencesBarChartCard />
                  <TorOccurrencesBarChartCard />
                  <TarOccurrencesBarChartCard />
                </div>
              </main>
            </div>
          </div>
        )}
      </TotalManHoursDashboardContext.Consumer>
    </TotalManHoursDashboardProvider>
  );
};
