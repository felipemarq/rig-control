import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/view/components/Button";
import { Select } from "@/view/components/Select";

import { DatePickerInput } from "@/view/components/DatePickerInput";
import { OccurenceNature, OccurrenceType } from "@/app/entities/Occurrence";
import { occurrenceTypeSelectOptions } from "../pages/Occurrences/utils/occurrenceTypeSelectOptions";
import { natureSelectOptions } from "../pages/Occurrences/utils/natureSelectOptions";
import { useOccurrencesFiltersContext } from "@/app/hooks/useOccurrencesFiltersContext";
export const OccurrenceFiltersSheet = () => {
  const { filters, bases, handleChangeFilters, handleClearFilters, handleApplyFilters } =
    useOccurrencesFiltersContext();
  return (
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
                <Select
                  placeholder="Sonda"
                  value={filters.baseId ?? ""}
                  onChange={(value) => handleChangeFilters("baseId")(value)}
                  options={bases.map(({ id, name }) => ({
                    value: id ?? "",
                    label: name ?? "",
                  }))}
                />

                <>
                  <div>
                    <DatePickerInput
                      placeholder="Data de Início"
                      error={""}
                      value={new Date(filters.startDate)}
                      onChange={(value) =>
                        handleChangeFilters("startDate")(value.toISOString())
                      }
                    />
                  </div>

                  <div>
                    <DatePickerInput
                      placeholder="Data de Início"
                      error={""}
                      value={new Date(filters.endDate)}
                      onChange={(value) =>
                        handleChangeFilters("endDate")(value.toISOString())
                      }
                    />
                  </div>
                </>
              </div>
              <ToggleGroup
                onValueChange={(value) =>
                  handleChangeFilters("type")(value as OccurrenceType)
                }
                type="single"
                className="flex-col items-start gap-2"
              >
                <span>Tipo da Ocorrência:</span>
                <div className="flex flex-wrap gap-4">
                  {occurrenceTypeSelectOptions.map((occurrenceType) => (
                    <ToggleGroupItem
                      className="bg-white"
                      value={occurrenceType.value}
                      size="sm"
                      variant="outline"
                    >
                      <span>{occurrenceType.label}</span>
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>

              <ToggleGroup
                onValueChange={(value) =>
                  handleChangeFilters("nature")(value as OccurenceNature)
                }
                type="single"
                className="flex-col items-start gap-2"
              >
                <span>Natureza da Ocorrência:</span>
                <div className="flex flex-wrap gap-4">
                  {natureSelectOptions.map((occurrenceNature) => (
                    <ToggleGroupItem
                      className="bg-white"
                      value={occurrenceNature.value}
                      size="sm"
                      variant="outline"
                    >
                      <span>{occurrenceNature.label}</span>
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>

              <div className="w-full flex flex-col gap-2">
                <Button
                  //disabled={!isFiltersValid}
                  className="h-[32px] w-full"
                  onClick={handleClearFilters}
                  variant="ghost"
                >
                  Limpar Filtros
                </Button>

                <Button
                  //disabled={!isFiltersValid}
                  className="h-[32px] w-full"
                  onClick={handleApplyFilters}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
