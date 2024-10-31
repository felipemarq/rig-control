// Importações de componentes e contextos necessários
import { DashboardContext, DashboardProvider } from "./DashboardContext";
import { GrouppedRepairsCard } from "./components/GrouppedRepairsCard";
import { GrouppedGlossesCard } from "./components/GrouppedGlossesCard";
import { StatboxContainer } from "./components/StatboxContainer";
import { LineChartCard } from "./components/LineChartCard";
import { AverageBarChartCard } from "./components/AverageBarChartCard";
import { DataGridCard } from "./components/DataGridCard";
import { RepairDetailsPieChartCard } from "./components/RepairDetailsPieChartCard";
import { GlossDetailsPieChartCard } from "./components/GlossDetailsPieChartCard";
import { CustomFilterSheet } from "@/view/components/CustomFilterSheet";
import { Header } from "@/view/components/Header";
import { CalendarChartCard } from "./components/CalendarChartCard";
import { WrongVersionAlertModal } from "./components/WrongVersionAlertModal";
import { WellDataGridCard } from "./components/WellDataGridCard";
import { PeriodDataGridModal } from "./components/PeriodDataGridModal";
import { GrouppedRepairPieChartCard } from "./components/GrouppedRepairsPieChartCard";
import { WellsCountBarChartCard } from "./components/WellsCountBarChartCard";
import { NotificationsPopover } from "@/view/components/NotificationsPopover";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({
          handleApplyFilters,
          isFetchingEfficiencies,
          exceedsEfficiencyThreshold,
          isWrongVersion,
          periodDataGridModalData,
          notifications,
          showNotifications,
          setShowNotifications,
          handleMarkNotificationAsRead,
          isPending,
        }) => (
          <div className="">
            <Header displayRig title="Dashboard por Sonda">
              <div className="flex gap-2 items-center">
                <NotificationsPopover
                  handleMarkNotificationAsRead={handleMarkNotificationAsRead}
                  isPending={isPending}
                  notifications={notifications}
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                />
                <CustomFilterSheet
                  isLoading={isFetchingEfficiencies}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </Header>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />

                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  {!exceedsEfficiencyThreshold && <LineChartCard />}

                  <CalendarChartCard />

                  <WellDataGridCard />

                  <DataGridCard />

                  <GrouppedRepairsCard />

                  <GrouppedRepairPieChartCard />

                  <RepairDetailsPieChartCard />

                  <GrouppedGlossesCard />

                  <GlossDetailsPieChartCard />

                  <AverageBarChartCard />

                  <WellsCountBarChartCard />

                  {isWrongVersion && <WrongVersionAlertModal />}

                  {periodDataGridModalData && <PeriodDataGridModal />}
                </div>
              </main>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};

export default Dashboard;
