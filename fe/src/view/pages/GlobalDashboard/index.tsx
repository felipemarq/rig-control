import { NewHader } from "@/view/components/NewHeader";
import { FilterSheet } from "@/view/components/FilterSheet";
import {
  GlobalDashboardContext,
  GlobalDashboardProvider,
} from "./GlobalDashboardContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatboxContainer } from "./components/StatboxContainer";
import { AverageBarChartCard } from "./components/AverageBarChartCard";
import { DaysNotRegisteredCard } from "./components/DaysNotRegisteredCard";
import { UnbilledPeriodsPieChartCard } from "./components/UnbilledPeriodsPieChartCard";
import { PeriodsDetailsPieChartCard } from "./components/PeriodsDetailsPieChartCard";
import { UnbilledPeriodsByRigCard } from "./components/UnbilledPeriodsByRigCard";
import { RepairDetailsPieChartCard } from "./components/RepairDetailsPieChartCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function GlobalDashboard() {
  return (
    <GlobalDashboardProvider>
      <GlobalDashboardContext.Consumer>
        {({
          isDetailsGraphVisible,
          handleApplyFilters,
          isFetchingRigsAverage,
          handleChangeDashboardView,
          selectedDashboardView,
          selectedPeriodClassification,
          selectedPieChartView,
          selectedDetailPieChartView,
          mappedRigsRepairHours,
          selectedRepairPeriodClassification,
          mappedRigsUnbilledHours,
          handleExcelDownload,

          isFetchingReport,
        }) => (
          <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <NewHader title="Dashboard Geral" displayRig={false}>
              <div className="flex flex-row-reverse gap-2 justify-center items-center">
                <FilterSheet
                  onApplyFilters={handleApplyFilters}
                  isLoading={isFetchingRigsAverage}
                />
                <Button
                  className="gap-2 "
                  variant="default"
                  onClick={handleExcelDownload}
                  isLoading={isFetchingReport}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden lg:inline">Excel</span>
                </Button>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger
                      value="all"
                      onClick={() => handleChangeDashboardView("ALL")}
                    >
                      Todos
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      onClick={() => handleChangeDashboardView("BA")}
                    >
                      BA
                    </TabsTrigger>
                    <TabsTrigger
                      value="draft"
                      onClick={() => handleChangeDashboardView("AL")}
                    >
                      AL
                    </TabsTrigger>
                    <TabsTrigger
                      value="archived"
                      onClick={() => handleChangeDashboardView("SE")}
                    >
                      SE
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </NewHader>

            <div className="lg:p-6">
              <div className="max-w-7xl mx-auto space-y-6 ">
                {/* KPI Cards */}
                <StatboxContainer />

                {/* Charts Section */}
                <div className="grid gap-6 lg:grid-cols-6">
                  <AverageBarChartCard className="p-4 lg:col-span-4" />

                  <DaysNotRegisteredCard className="lg:col-span-2" />

                  {selectedDashboardView === "ALL" && (
                    <>
                      <UnbilledPeriodsPieChartCard className="lg:col-span-2" />
                      {isDetailsGraphVisible && (
                        <PeriodsDetailsPieChartCard className="lg:col-span-2" />
                      )}
                    </>
                  )}
                  <UnbilledPeriodsByRigCard
                    className="lg:col-span-2"
                    rigsData={mappedRigsUnbilledHours}
                    selectedView={selectedPieChartView}
                    selectedDetailView={selectedDetailPieChartView ?? undefined}
                  />

                  {selectedPeriodClassification && selectedPieChartView === "REPAIR" && (
                    <RepairDetailsPieChartCard />
                  )}

                  {selectedRepairPeriodClassification && (
                    <UnbilledPeriodsByRigCard
                      className="lg:col-span-2"
                      rigsData={mappedRigsRepairHours}
                      selectedDetailView={selectedDetailPieChartView ?? undefined}
                      selectedRepairClassification={
                        selectedRepairPeriodClassification ?? undefined
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </GlobalDashboardContext.Consumer>
    </GlobalDashboardProvider>
  );
}
