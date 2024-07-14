import { ManHoursDataGrid } from "./ManHoursDataGrid";
import { useManHoursController } from "./useManHoursController";

export const ManHours = () => {
  const { dataGridData, isFetchingManHours } = useManHoursController();
  return (
    <div>
      Man Hours
      {dataGridData.length > 0 && !isFetchingManHours && (
        <ManHoursDataGrid data={dataGridData} isDashboard={false} />
      )}
    </div>
  );
};
