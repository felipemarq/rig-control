import { Header } from "../../components/Header";

import { ReportContext, ReportProvider } from "./components/ReportContext";

import { Spinner } from "../../components/Spinner";
import { NotFound } from "../../components/NotFound";
import { PeriodsDataGrid } from "./components/PeriodsDataGrid";

import { ReportFilterPanel } from "./components/ReportFilterPanel";

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
          handleChangeSearchTerm,
          isFetchingReport,
          handleExcelDownload,
        }) => (
          <div className="w-11/12 h-full m-auto ">
            <Header
              title="Relatórios"
              displayRig={false}
              displayPeriodRange={false}
            />

            <div className="p-4 md:p-6">
              <ReportFilterPanel
                rigs={rigs}
                isFetchingPeriods={isFetchingPeriods}
                selectedYear={selectedYear}
                filterOptions={filterOptions}
                selectedFilterType={selectedFilterType}
                handleToggleFilterType={handleToggleFilterType}
                handleChangePeriod={handleChangePeriod}
                handleYearChange={handleYearChange}
                handleApplyFilters={handleApplyFilters}
                handleChangeRig={handleChangeRig}
                selectedRig={selectedRig}
                selectedPeriod={selectedPeriod}
                months={months}
                years={years}
                handleEndDateChange={handleEndDateChange}
                handleStartDateChange={handleStartDateChange}
                selectedEndDate={selectedEndDate}
                selectedStartDate={selectedStartDate}
                periodTypeOptions={periodTypeOptions}
                periodClassificationOptions={periodClassificationOptions}
                repairClassificationOptions={repairClassificationOptions}
                handlePeriodClassification={handlePeriodClassification}
                handleRepairClassification={handleRepairClassification}
                handleTogglePeriodType={handleTogglePeriodType}
                handleClearFilters={handleClearFilters}
                isFiltersValid={isFiltersValid}
                handleChangeSearchTerm={handleChangeSearchTerm}
                isFetchingReport={isFetchingReport}
                handleExcelDownload={handleExcelDownload}
                filters={filters}
              />

              {isEmpty && (
                <>
                  {isFetchingPeriods && (
                    <div className="w-full h-[400px] flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingPeriods && (
                    <div className="mt-8">
                      <NotFound>
                        <strong>Não</strong> existem dados para a{" "}
                        <strong>sonda</strong> no <strong>período</strong>{" "}
                        selecionado!
                      </NotFound>
                    </div>
                  )}
                </>
              )}

              {!isEmpty && (
                <div className="w-full mt-4">
                  <div className="w-full rounded-md bg-white shadow-sm border">
                    <PeriodsDataGrid
                      isLoading={isFetchingPeriods}
                      periods={periods}
                      totalItems={totalItems}
                      filters={filters}
                      onPaginationModelChange={onPaginationModelChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};

export default Report;
