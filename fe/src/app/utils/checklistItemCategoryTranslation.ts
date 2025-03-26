import { ChecklistItemCategory } from "../entities/ChecklistItem";

export const occurrenceTypeTranslation = [
  {
    value: ChecklistItemCategory.INT,
    label: "Integridade",
  },
  {
    value: ChecklistItemCategory.INT_MANT,
    label: "Integridade e Manutenção",
  },
  {
    value: ChecklistItemCategory.LOG,
    label: "Logística",
  },
  {
    value: ChecklistItemCategory.MANT,
    label: "Manutenção",
  },
  {
    value: ChecklistItemCategory.OP,
    label: "Operações",
  },
  {
    value: ChecklistItemCategory.SGI,
    label: "Sistema de Gestão Integrado",
  },
  {
    value: ChecklistItemCategory.SMS,
    label: "Segurança, Meio Ambiente e Saúde",
  },
];
