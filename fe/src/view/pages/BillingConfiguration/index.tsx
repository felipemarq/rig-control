import { Header } from "@/view/components/Header";
import { TaxesContainer } from "./TaxesContainer";

const BillingConfiguration = () => {
  return (
    <div className="overflow-y-auto w-full">
      <Header displayRig={false} displayPeriodRange={false} title={`Cálculo de previsão de faturamento da sonda`}></Header>
      <div>
        <TaxesContainer />
      </div>
    </div>
  );
};

export default BillingConfiguration;
