import { ManHoursDataGridCard } from "./components/ManHoursDataGridCard";
import { useManHoursController } from "./useManHoursController";

const ManHours = () => {
  const {} = useManHoursController();
  return (
    <div className="w-full h-full overflow-y-auto flex justify-center items-center">
      <div className="w-full h-full  p-2 rounded-md flex justify-center items-center lg:w-[85vw] lg:h-[89vh]">
        <ManHoursDataGridCard />
      </div>
    </div>
  );
};

export default ManHours;
