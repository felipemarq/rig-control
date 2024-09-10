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
import { Card } from "@/components/ui/card";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";

export const TotalManHoursDashboard = () => {
  return (
    <TotalManHoursDashboardProvider>
      <TotalManHoursDashboardContext.Consumer>
        {({
          hasAbsentOccurrencesOccurrence,
          hasNotAbsentOccurrence,
          hasTarOccurrence,
          hasTorOccurrence,
          isFetchingOccurrencesTaxes,
          isEmpty,
        }) => (
          <div className="overflow-y-auto w-full">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Dashboard Geral"
            ></Header>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                {!isFetchingOccurrencesTaxes && (
                  <>
                    {" "}
                    <StatboxContainer />
                    {!isEmpty && (
                      <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[60px]">
                        {hasTorOccurrence && <TorOccurrencesBarChartCard />}
                        {hasTarOccurrence && <TarOccurrencesBarChartCard />}
                        {hasNotAbsentOccurrence && (
                          <TfsaOccurrencesBarChartCard />
                        )}
                        {hasAbsentOccurrencesOccurrence && (
                          <TfcaOccurrencesBarChartCard />
                        )}
                      </div>
                    )}
                    {isEmpty && (
                      <Card className="h-full flex items-center justify-center">
                        <NotFound>
                          {
                            <p>
                              Sem dados para o <strong>período</strong>{" "}
                              selecionado
                            </p>
                          }
                        </NotFound>
                      </Card>
                    )}
                  </>
                )}

                {isFetchingOccurrencesTaxes && (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                )}
              </main>
            </div>
          </div>
        )}
      </TotalManHoursDashboardContext.Consumer>
    </TotalManHoursDashboardProvider>
  );
};
