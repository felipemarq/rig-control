"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Download, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GetByPeriodTypeFilters } from "@/app/services/periodsService/getByPeriodType";
import { SelectOptions } from "@/app/entities/SelectOptions";
import { Rig } from "@/app/entities/Rig";
import { FilterType } from "@/app/entities/FilterType";
import { PeriodType } from "@/app/entities/PeriodType";
import { PeriodClassification } from "@/app/entities/PeriodClassification";
import { RepairClassification } from "@/app/entities/RepairClassification";
import { Select } from "@/view/components/Select";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { Input } from "@/components/ui/input";

interface ReportFilterPanelProps {
  rigs: Rig[] | { id: string; name: string }[];
  selectedYear: string;
  filterOptions: SelectOptions;
  handleChangePeriod(period: string): void;
  handleChangeRig(rigId: string): void;
  selectedFilterType: FilterType;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleYearChange(year: string): void;
  handleToggleFilterType(filterType: FilterType): void;
  handleTogglePeriodType(type: PeriodType): void;
  handleApplyFilters(): void;
  handleClearFilters(): void;
  handleChangeSearchTerm(searchTerm: string): void;
  handlePeriodClassification(classification: PeriodClassification): void;
  handleRepairClassification(repairClassification: RepairClassification): void;
  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  months: SelectOptions;
  years: SelectOptions;
  periodTypeOptions: SelectOptions;
  periodClassificationOptions: SelectOptions | null;
  repairClassificationOptions: SelectOptions | null;
  selectedEndDate: string;
  selectedStartDate: string;
  filters: GetByPeriodTypeFilters;
  isFiltersValid: boolean;
  handleExcelDownload: () => Promise<void>;
  isFetchingReport: boolean;
}

export function ReportFilterPanel({
  rigs,
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
  handleStartDateChange,
  selectedEndDate,
  selectedStartDate,
  periodTypeOptions,
  periodClassificationOptions,
  repairClassificationOptions,
  handlePeriodClassification,
  handleRepairClassification,
  handleTogglePeriodType,
  handleClearFilters,
  isFiltersValid,
  handleChangeSearchTerm,
  isFetchingReport,
  handleExcelDownload,
  filters,
}: ReportFilterPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Count active filters
  const activeFiltersCount = [
    selectedRig ? 1 : 0,
    filters.periodType.length,
    filters.periodClassification.length,
    filters.repairClassification.length,
    filters.searchTerm ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="relative flex-1 min-w-[280px]">
          <Input
            name="search"
            placeholder="Buscar por palavra-chave..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeSearchTerm(searchTerm);
                handleApplyFilters();
              }
            }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md md:max-w-lg bg-card overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Configure os filtros para o relatório
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">
                    Todos os filtros são opcionais. Se nenhum filtro for
                    selecionado, todos os dados serão exibidos.
                  </p>
                </div>

                <Accordion
                  type="multiple"
                  defaultValue={["date-range", "rig", "period-type"]}
                  className="text-gray-900"
                >
                  <AccordionItem value="date-range">
                    <AccordionTrigger>Período de Datas</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid gap-2">
                          <Label>Tipo de Filtro</Label>
                          <Select
                            placeholder="Tipo de Filtro"
                            value={selectedFilterType}
                            onChange={(value) =>
                              handleToggleFilterType(value as FilterType)
                            }
                            options={filterOptions}
                          />
                        </div>

                        {selectedFilterType === FilterType.PERIOD && (
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label>Ano</Label>
                              <Select
                                error={""}
                                placeholder="Ano"
                                value={selectedYear}
                                onChange={(value) => handleYearChange(value)}
                                options={years}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Período</Label>
                              <Select
                                error={""}
                                placeholder="Período"
                                value={selectedPeriod}
                                onChange={(value) => handleChangePeriod(value)}
                                options={months}
                              />
                            </div>
                          </div>
                        )}

                        {selectedFilterType === FilterType.CUSTOM && (
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label>Data Inicial</Label>
                              <DatePickerInput
                                placeholder="Data de Início"
                                error={""}
                                value={new Date(selectedStartDate)}
                                onChange={(value) =>
                                  handleStartDateChange(value)
                                }
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Data Final</Label>
                              <DatePickerInput
                                placeholder="Data de Fim"
                                error={""}
                                value={new Date(selectedEndDate)}
                                onChange={(value) => handleEndDateChange(value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rig">
                    <AccordionTrigger>Sonda</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2 pt-2">
                        <Label>Selecione a Sonda</Label>
                        <Select
                          placeholder={
                            !selectedRig ? "Todas as Sondas" : "Sonda"
                          }
                          value={selectedRig}
                          onChange={(value) => handleChangeRig(value)}
                          options={rigs.map(({ id, name }) => ({
                            value: id ?? "",
                            label: name ?? "",
                          }))}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="period-type">
                    <AccordionTrigger>Tipo de Período</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        <Label className="mb-3 block">
                          Selecione os tipos de período
                        </Label>
                        <ScrollArea className="h-[200px] pr-4">
                          <div className="space-y-3">
                            {periodTypeOptions.map((periodType) => (
                              <div
                                key={periodType.value}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`period-type-${periodType.value}`}
                                  checked={filters.periodType.includes(
                                    periodType.value as PeriodType,
                                  )}
                                  onCheckedChange={() => {
                                    handleTogglePeriodType(
                                      periodType.value as PeriodType,
                                    );
                                  }}
                                />
                                <Label
                                  htmlFor={`period-type-${periodType.value}`}
                                  className="cursor-pointer"
                                >
                                  {periodType.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {periodClassificationOptions && (
                    <AccordionItem value="period-classification">
                      <AccordionTrigger>
                        Classificação do Período
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <Label className="mb-3 block">
                            Selecione as classificações
                          </Label>
                          <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-3">
                              {periodClassificationOptions.map(
                                (classification) => (
                                  <div
                                    key={classification.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`period-class-${classification.value}`}
                                      checked={filters.periodClassification.includes(
                                        classification.value as PeriodClassification,
                                      )}
                                      onCheckedChange={() => {
                                        handlePeriodClassification(
                                          classification.value as PeriodClassification,
                                        );
                                      }}
                                    />
                                    <Label
                                      htmlFor={`period-class-${classification.value}`}
                                      className="cursor-pointer"
                                    >
                                      {classification.label}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {repairClassificationOptions && (
                    <AccordionItem value="repair-classification">
                      <AccordionTrigger>
                        Classificação de Reparo
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <Label className="mb-3 block">
                            Selecione as classificações de reparo
                          </Label>
                          <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-3">
                              {repairClassificationOptions.map(
                                (classification) => (
                                  <div
                                    key={classification.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`repair-class-${classification.value}`}
                                      checked={filters.repairClassification.includes(
                                        classification.value as RepairClassification,
                                      )}
                                      onCheckedChange={() => {
                                        handleRepairClassification(
                                          classification.value as RepairClassification,
                                        );
                                      }}
                                    />
                                    <Label
                                      htmlFor={`repair-class-${classification.value}`}
                                      className="cursor-pointer"
                                    >
                                      {classification.label}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>

                <Separator />

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                  <Button
                    onClick={() => {
                      handleApplyFilters();
                    }}
                    disabled={!isFiltersValid}
                    className="w-full"
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Excel</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Baixar relatório em Excel</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-6 mt-4">
                    <p>
                      O relatório em formato Excel será gerado com todos os
                      períodos conforme os filtros aplicados. Esse processo pode
                      levar alguns instantes, dependendo da quantidade de dados.
                    </p>
                    <Button
                      className="gap-2"
                      onClick={handleExcelDownload}
                      disabled={isFetchingReport}
                    >
                      {isFetchingReport ? (
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      <span>Download Excel</span>
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedRig && (
            <Badge variant="outline" className="flex items-center gap-1">
              <span>Sonda: {rigs.find((r) => r.id === selectedRig)?.name}</span>
            </Badge>
          )}

          {filters.periodType.map((type) => (
            <Badge
              key={`type-${type}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span>
                Tipo: {periodTypeOptions.find((t) => t.value === type)?.label}
              </span>
            </Badge>
          ))}

          {filters.periodClassification.map((classification) => (
            <Badge
              key={`class-${classification}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span>
                Classificação:{" "}
                {
                  periodClassificationOptions?.find(
                    (c) => c.value === classification,
                  )?.label
                }
              </span>
            </Badge>
          ))}

          {filters.repairClassification.map((classification) => (
            <Badge
              key={`repair-${classification}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span>
                Reparo:{" "}
                {
                  repairClassificationOptions?.find(
                    (c) => c.value === classification,
                  )?.label
                }
              </span>
            </Badge>
          ))}

          {filters.searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              <span>Busca: "{filters.searchTerm}"</span>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
