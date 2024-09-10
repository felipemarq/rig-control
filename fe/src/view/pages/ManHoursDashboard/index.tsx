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
import { NotFound } from "@/view/components/NotFound";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/view/components/Spinner";

export const ManHoursDashboard = () => {
  return (
    <ManHourDashboardProvider>
      <ManHourDashboardContext.Consumer>
        {({
          isEmpty,
          bases,
          handleChangeBaseId,
          isFetchingBases,
          selectedBaseId,
          applyFilters,
          hasAbsentOccurrencesOccurrence,
          hasNotAbsentOccurrence,
          hasTarOccurrence,
          hasTorOccurrence,
          isFetchingOccurrencesTaxes,
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
            <div className="flex w-full flex-col h-full">
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
      </ManHourDashboardContext.Consumer>
    </ManHourDashboardProvider>
  );
};
