export const mockContracts = [
  { id: "contract-1", name: "Contrato Petrobras 2024" },
  { id: "contract-2", name: "Contrato Shell Brasil" },
  { id: "contract-3", name: "Contrato Equinor" },
  { id: "contract-4", name: "Contrato Total Energies" },
];

export const mockWells = [
  {
    id: "well-1",
    name: "Poço Marlim-1",
    contractId: "contract-1",
    contract: { id: "contract-1", name: "Contrato Petrobras 2024" },
  },
  {
    id: "well-2",
    name: "Poço Jubarte-2",
    contractId: "contract-1",
    contract: { id: "contract-1", name: "Contrato Petrobras 2024" },
  },
  {
    id: "well-3",
    name: "Poço Lula-3",
    contractId: "contract-2",
    contract: { id: "contract-2", name: "Contrato Shell Brasil" },
  },
  {
    id: "well-4",
    name: "Poço Búzios-4",
    contractId: "contract-2",
    contract: { id: "contract-2", name: "Contrato Shell Brasil" },
  },
  {
    id: "well-5",
    name: "Poço Mero-5",
    contractId: "contract-3",
    contract: { id: "contract-3", name: "Contrato Equinor" },
  },
  {
    id: "well-6",
    name: "Poço Atapu-6",
    contractId: null,
    contract: null,
  },
  {
    id: "well-7",
    name: "Poço Sépia-7",
    contractId: "contract-4",
    contract: { id: "contract-4", name: "Contrato Total Energies" },
  },
  {
    id: "well-8",
    name: "Poço Tupi-8",
    contractId: null,
    contract: null,
  },
];
