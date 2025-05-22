import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { UnbilledPeriodsPieChartCn } from "../UnbilledPeriodsPieChartCn";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { UnbilledPeriodsByRigCard } from "../UnbilledPeriodsByRigCard";
import { PeriodType } from "@/app/entities/PeriodType";
import { PeriodsDetailsPieChartCn } from "../PeriodsDetailsPieChartCn";
import { RepairDetailsPieChartCn } from "../RepairDetailsPieChartCn";
export default function UnbilledTimeAnalysis() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("overview");
  const {
    handleSelectedPieChartViewChange,
    unbilledPeriodsChartData,
    mappedRigsUnbilledHours,
    selectedPieChartView,
    selectedDetailPieChartView,
    selectedPeriodDetailsGraphView,
    unbilledPeriodsDetailsChartData,
    handleSelectedDetailPieChartViewChange,
    repairDetailsChartData,
    handleSelectedRepairPeriodClassificationChange,
    handleChangePeriodDetailsGraphView,
    mappedRigsRepairHours,
    selectedRepairPeriodClassification,
  } = useGlobalDashboard();

  const handlePieClick = () => {
    setActiveTab("details");
  };

  const handleEquipmentClick = () => {
    setActiveTab("repair-details");
  };

  const handleBackToOverview = () => {
    setSelectedEquipment(null);
    setActiveTab("overview");
  };

  const handleBackToDetails = () => {
    handleSelectedRepairPeriodClassificationChange(null);
    setActiveTab("details");
  };

  return (
    <div className="col-span-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle className="text-lg pb-0">
            {activeTab === "overview" && "Tempo não faturado"}
            {activeTab === "details" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToOverview}
                  className="p-0 h-auto"
                >
                  Tempo não faturado
                </Button>
                <ChevronRight className="h-4 w-4" />
                <span>Detalhes do período não faturado</span>
              </div>
            )}
            {activeTab === "repair-details" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToOverview}
                  className="p-0 h-auto"
                >
                  Tempo não faturado
                </Button>
                <ChevronRight className="h-4 w-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToDetails}
                  className="p-0 h-auto"
                >
                  Detalhes do período
                </Button>
                <ChevronRight className="h-4 w-4" />
                <span>Detalhes do Reparo: {selectedEquipment}</span>
              </div>
            )}
          </CardTitle>
          {activeTab === "details" && (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handleChangePeriodDetailsGraphView()}
            >
              {selectedPeriodDetailsGraphView === "HOURS" ? "%" : "Horas"}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="overview" className="m-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-[300px] ">
                  <UnbilledPeriodsPieChartCn
                    chartData={unbilledPeriodsChartData}
                    handleChangeTab={handlePieClick}
                    handleSelectedPieChartViewChange={
                      handleSelectedPieChartViewChange
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold mb-2">
                    {unbilledPeriodsChartData
                      .reduce((acc, curr) => acc + curr.value, 0)
                      .toFixed(2)}{" "}
                    hrs
                  </div>
                  <div className="text-sm text-slate-500 mb-6">
                    Total de tempo não faturado
                  </div>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                    {unbilledPeriodsChartData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 cursor-pointer"
                        onClick={() => {
                          handlePieClick();
                          handleSelectedPieChartViewChange(
                            item.label as PeriodType,
                          );
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          ></div>
                          <span className="text-sm">{item.id}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {item.value} hrs
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="m-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-[300px]">
                  <PeriodsDetailsPieChartCn
                    handleChangeTab={handleEquipmentClick}
                    selectedView={selectedPeriodDetailsGraphView}
                    chartData={unbilledPeriodsDetailsChartData}
                    handleSelectedDetailPieChartViewChange={
                      handleSelectedDetailPieChartViewChange
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold mb-2">
                    Detalhes do período selecionado
                  </div>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs mt-4">
                    {unbilledPeriodsDetailsChartData
                      .sort((a, b) => b.value - a.value)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 cursor-pointer"
                          onClick={() => {
                            handleSelectedDetailPieChartViewChange(item.id);
                            handleEquipmentClick();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.fill }}
                            ></div>
                            <span className="text-sm">{item.id}</span>
                          </div>
                          <div className="text-sm font-medium ">
                            <span className="flex items-center gap-2">
                              {" "}
                              {item.value}{" "}
                              {selectedPeriodDetailsGraphView === "HOURS"
                                ? "Hrs"
                                : "%"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="repair-details" className="m-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-[300px]">
                  <RepairDetailsPieChartCn
                    chartData={repairDetailsChartData}
                    handleSelectedRepairPeriodClassificationChange={
                      handleSelectedRepairPeriodClassificationChange
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold mb-2">
                    Componentes com falha
                  </div>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs mt-4">
                    {repairDetailsChartData
                      .sort((a, b) => b.value - a.value)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.fill }}
                            ></div>
                            <span className="text-sm">{item.id}</span>
                          </div>
                          <div className="text-sm font-medium">
                            {item.value} hrs
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <UnbilledPeriodsByRigCard
        rigsData={
          selectedRepairPeriodClassification
            ? mappedRigsRepairHours
            : mappedRigsUnbilledHours
        }
        selectedRepairClassification={
          selectedRepairPeriodClassification ?? undefined
        }
        selectedView={selectedPieChartView}
        selectedDetailView={selectedDetailPieChartView ?? undefined}
      />
    </div>
  );
}
