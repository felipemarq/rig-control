import { FilterSheet } from "@/view/components/FilterSheet";
import {
  GlobalDashboardContext,
  GlobalDashboardProvider,
} from "./GlobalDashboardContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatboxContainer } from "./components/StatboxContainer";
import { AverageBarChartCard } from "./components/AverageBarChartCard";
import { DaysNotRegisteredCard } from "./components/DaysNotRegisteredCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Header } from "@/view/components/Header";
import UnbilledTimeAnalysis from "./components/UnbilledTimeAnalysis";

export default function GlobalDashboard() {
  return (
    <GlobalDashboardProvider>
      <GlobalDashboardContext.Consumer>
        {({
          handleApplyFilters,
          isFetchingRigsAverage,
          handleChangeDashboardView,
          handleExcelDownload,

          isFetchingReport,
        }) => (
          <div className="container mx-auto p-4">
            {/* Header */}
            <Header title="Dashboard Geral" displayRig={false}>
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
            </Header>

            <div>
              {/* KPI Cards */}
              <StatboxContainer />

              {/* Charts Section */}
              <div className="grid gap-6 lg:grid-cols-6 grid-cols-1">
                <AverageBarChartCard className="p-4 lg:col-span-4" />

                <DaysNotRegisteredCard className="lg:col-span-2" />

                <UnbilledTimeAnalysis />
              </div>
            </div>
          </div>
        )}
      </GlobalDashboardContext.Consumer>
    </GlobalDashboardProvider>
  );
}
