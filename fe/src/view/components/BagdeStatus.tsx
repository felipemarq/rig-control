import { useAuth } from "@/app/hooks/useAuth";
import { useFiltersContext } from "@/app/hooks/useFiltersContext";
import { formatDate } from "@/app/utils/formatDate";
import { months } from "@/app/utils/months";
import { CalendarDays } from "lucide-react";

interface BagdeStatusProps {
  displayRig?: boolean;
}

export const BagdeStatus = ({ displayRig = false }: BagdeStatusProps) => {
  const { filters } = useFiltersContext();
  const { user } = useAuth();

  const selectedRig = user?.rigs.find(({ rig }) => rig.id === filters.rigId);

  const [stringStartDay, stringStartMonth] = formatDate(
    new Date(filters.startDate)
  ).split("/");

  const [stringEndDay, stringEndMonth] = formatDate(new Date(filters.endDate)).split("/");

  const test = `${stringStartDay} de ${months[Number(stringStartMonth) - 1].label}`;
  const test2 = `${stringEndDay} de ${months[Number(stringEndMonth) - 1].label}`;
  months[3];
  return (
    <div className="flex  gap-4">
      <div className="flex justify-center items-center text-sm text-muted-foreground gap-2">
        <CalendarDays absoluteStrokeWidth={false} /> <span>{`${test} a ${test2}`}</span>
      </div>

      {selectedRig && displayRig && (
        <div className=" flex items-center text-sm text-muted-foreground">
          <span>{`${selectedRig?.rig.name}`}</span>
        </div>
      )}
    </div>
  );
};
