import { FilterType } from "../../../app/entities/FilterType";
import { Button } from "../../components/Button";
import { DatePickerInput } from "../../components/DatePickerInput";
import { Header } from "../../components/Header";
import { Select } from "../../components/Select";
import { ReportContext, ReportProvider } from "./components/ReportContext";
import { PeriodType } from "../../../app/entities/PeriodType";
import { Spinner } from "../../components/Spinner";
import { NotFound } from "../../components/NotFound";
import { PeriodsDataGrid } from "./components/PeriodsDataGrid";
import { PeriodClassification } from "../../../app/entities/PeriodClassification";
import { RepairClassification } from "../../../app/entities/RepairClassification";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Report = () => {
  return (
    <ReportProvider>
      <ReportContext.Consumer>
        {({
          rigs,
          periods,
          selectedYear,
          filterOptions,
          selectedFilterType,
          handleToggleFilterType,
          handleChangePeriod,
          handleYearChange,
          handleApplyFilters,
          handleChangeRig,
          selectedRig,
          selectedPeriod,
          months,
          years,
          handleEndDateChange,
          onPaginationModelChange,
          handleStartDateChange,
          selectedEndDate,
          selectedStartDate,
          periodTypeOptions,
          selectedPeriodType,
          periodClassificationOptions,
          isFetchingPeriods,
          totalItems,
          handleRepairClassification,
          handlePeriodClassification,
          handleTogglePeriodType,
          handleClearFilters,
          repairClassificationOptions,
          isEmpty,
          filters,
          isFiltersValid,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="Relatórios" displayRig={false} displayPeriodRange={false}>
              <div className="flex justify-end">
                <Sheet>
                  <SheetTrigger>
                    <Button>Filtros</Button>
                  </SheetTrigger>
                  <SheetContent className="bg-card overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="border-b-2 mb-8 border-gray-500">Filtros</SheetTitle>
                      <SheetDescription className="">
                        <div className="flex flex-col gap-12">
                          <div className="grid gap-4">
                            <Select placeholder="Tipo de Filtro" value={selectedFilterType} onChange={(value) => handleToggleFilterType(value as FilterType)} options={filterOptions} />

                            <Select
                              error={selectedRig ? "" : "Selecione uma sonda!"}
                              placeholder="Sonda"
                              value={selectedRig}
                              onChange={(value) => handleChangeRig(value)}
                              options={rigs.map(({ id, name }) => ({
                                value: id ?? "",
                                label: name ?? "",
                              }))}
                            />

                            {selectedFilterType === FilterType.PERIOD && (
                              <>
                                <Select error={""} placeholder="Ano" value={selectedYear} onChange={(value) => handleYearChange(value)} options={years} />

                                <Select error={""} placeholder="Período" value={selectedPeriod} onChange={(value) => handleChangePeriod(value)} options={months} />
                              </>
                            )}

                            {selectedFilterType === FilterType.CUSTOM && (
                              <>
                                <div>
                                  <DatePickerInput placeholder="Data de Início" error={""} value={new Date(selectedStartDate)} onChange={(value) => handleStartDateChange(value)} />
                                </div>

                                <div>
                                  <DatePickerInput placeholder="Data de Fim" error={""} value={new Date(selectedEndDate)} onChange={(value) => handleEndDateChange(value)} />
                                </div>
                              </>
                            )}
                          </div>
                          <ToggleGroup onValueChange={(value) => handleTogglePeriodType(value as PeriodType)} type="single" className="flex-col items-start gap-2">
                            <span>Tipo do Período:</span>
                            <div className="flex flex-wrap gap-4">
                              {periodTypeOptions.map((periodType) => (
                                <ToggleGroupItem className="bg-white" value={periodType.value} size="sm" variant="outline">
                                  <span>{periodType.label}</span>
                                </ToggleGroupItem>
                              ))}
                            </div>
                          </ToggleGroup>

                          {periodClassificationOptions && (
                            <ToggleGroup type="single" onValueChange={(value) => handlePeriodClassification(value as PeriodClassification)} className="flex-col items-start gap-2">
                              <span>Classificação do Período:</span>
                              <div className="flex flex-wrap gap-4">
                                {periodClassificationOptions.map((periodType) => (
                                  <ToggleGroupItem className="bg-white" value={periodType.value} size="sm" variant="outline">
                                    <span>{periodType.label}</span>
                                  </ToggleGroupItem>
                                ))}
                              </div>
                            </ToggleGroup>
                          )}

                          {selectedPeriodType === "REPAIR" && repairClassificationOptions && (
                            <ToggleGroup type="single" onValueChange={(value) => handleRepairClassification(value as RepairClassification)} className="flex-col items-start gap-2">
                              <span>Classificação do Período:</span>
                              <div className="flex flex-wrap gap-4">
                                {repairClassificationOptions.map((periodType) => (
                                  <ToggleGroupItem value={periodType.value} size="sm" variant="outline" className="bg-white">
                                    <span>{periodType.label}</span>
                                  </ToggleGroupItem>
                                ))}
                              </div>
                            </ToggleGroup>
                          )}

                          <div className="w-full flex flex-col gap-2">
                            <Button disabled={!isFiltersValid} className="h-[32px] w-full" onClick={handleClearFilters} variant="ghost">
                              Limpar Filtros
                            </Button>

                            <Button disabled={!isFiltersValid} className="h-[32px] w-full" onClick={handleApplyFilters}>
                              Aplicar Filtros
                            </Button>
                          </div>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </Header>

            {isEmpty && (
              <>
                {isFetchingPeriods && (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                )}

                {!isFetchingPeriods && (
                  <NotFound>
                    <strong>Não</strong> existem dados para a <strong>sonda</strong> no <strong>período</strong> selecionado!
                  </NotFound>
                )}
              </>
            )}

            {!isEmpty && (
              <div className="w-full  flex justify-center items-center">
                <div className="w-full p-4 m-4   rounded-md">
                  <PeriodsDataGrid isLoading={isFetchingPeriods} periods={periods} totalItems={totalItems} filters={filters} onPaginationModelChange={onPaginationModelChange} />
                </div>
              </div>
            )}
          </div>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};

export default Report;
