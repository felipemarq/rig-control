import { cn } from "@/lib/utils";
import { BagdeStatus } from "./BagdeStatus";

interface HeaderProps {
  displayRig: boolean;
  displayPeriodRange?: boolean;
  title: string;
  children?: React.ReactNode;
  className?: string;
}
export const Header = ({
  title,
  displayRig,
  children,
  displayPeriodRange = true,
  className,
}: HeaderProps) => {
  return (
    <div className={cn("flex justify-between p-4", className)}>
      <div className="flex flex-col gap-4">
        <span className="text-gray-800 text-2xl font-semibold tracking-[-1px]">
          {title}
        </span>
        {displayPeriodRange && <BagdeStatus displayRig={displayRig} />}
      </div>
      {children && children}
    </div>
  );
};
