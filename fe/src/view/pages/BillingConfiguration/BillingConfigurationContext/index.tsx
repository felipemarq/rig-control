import React, { createContext } from "react";

// Definição do tipo do contexto
interface BillingConfigurationContextValue {}

// Criação do contexto
export const BillingConfigurationContext = createContext(
  {} as BillingConfigurationContextValue
);

export const BillingConfigurationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <BillingConfigurationContext.Provider value={{}}>
      {children}
    </BillingConfigurationContext.Provider>
  );
};
