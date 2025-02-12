import Checkbox from "../../../../components/CheckBox";
import { useForm } from "../UpdateFormContext/useForm";

export const CarmoEnergyContainer = () => {
  const {
    isMobilizationSelected,
    handleMobilizationCheckbox,
    isMobilizationOutSelected,
    handleMobilizationOutCheckbox,
    isSuckingTruckSelected,
    handleSuckingTruckCheckbox,
  } = useForm();

  return (
    <div className="bg-primary py-4  w-1/2 my-4  rounded-xl ">
      <div className="p-4 rounded-xl flex flex-col gap-2">
        <div className="flex-1">
          <Checkbox
            checked={isMobilizationSelected}
            id="mobilization"
            handleChecked={handleMobilizationCheckbox}
          >
            Mobilização em aracaju
          </Checkbox>
        </div>

        <div className="flex-1">
          <Checkbox
            checked={isMobilizationOutSelected}
            id="mobilizationOut"
            handleChecked={handleMobilizationOutCheckbox}
          >
            Mobilização fora de aracaju
          </Checkbox>
        </div>

        <div>
          <Checkbox
            checked={isSuckingTruckSelected}
            id="suckingTruck"
            handleChecked={handleSuckingTruckCheckbox}
          >
            Caminhão Sugador
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
