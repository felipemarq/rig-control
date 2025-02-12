import { Select } from "@/view/components/Select";
import { ManHoursDataGridCard } from "./components/ManHoursDataGridCard";
import { useManHoursController } from "./useManHoursController";

const ManHours = () => {
  const { filters, handleChangeFilters } = useManHoursController();
  return (
    <div className="w-full h-full overflow-y-auto flex justify-center items-center p-4 ">
      <div className="w-full h-full  p-2 rounded-md flex flex-col gap-8 justify-center items-center lg:w-[85vw] lg:h-[89vh]">
        <div className="w-full flex justify-end">
          <Select
            className="w-44"
            //error={filters.year}
            placeholder="Selecione o ano"
            value={filters.year}
            onChange={(value) => handleChangeFilters("year")(value)}
            options={[
              { value: "2025", label: "2025" },
              { value: "2024", label: "2024" },
            ]}
          />
        </div>
        <ManHoursDataGridCard />
      </div>
    </div>
  );
};

export default ManHours;
