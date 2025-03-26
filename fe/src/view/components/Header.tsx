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
}: HeaderProps) => {
  return (
    <div className=" lg:p-4  backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {children && children}
        </div>
        {displayPeriodRange && <BagdeStatus displayRig={displayRig} />}
      </div>
    </div>
  );
};
