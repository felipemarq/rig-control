export interface DomainEfficiency {
  rigId: string | undefined;
  date: string | Date;
  availableHours: number;
  periods: {
    id: string;
    startHour: string;
    endHour: string;
    classification: string;
    type: string;
    description?: string;
    fluidRatio: string;
    equipmentRatio: string;
    repairClassification: string | null;
    well: string;
  }[];
  christmasTreeDisassemblyHours?: string;
  isMixTankSelected?: boolean;
  isMixTankOperatorsSelected?: boolean;
  isMixTankMonthSelected?: boolean;
  isFuelGeneratorSelected?: boolean;
  isMobilizationSelected?: boolean;
  isDemobilizationSelected?: boolean;
  isTankMixMobilizationSelected?: boolean;
  isTankMixDemobilizationSelected?: boolean;
  isMobilizationOutSelected?: boolean;
  isTankMixDTMSelected?: boolean;
  bobRentHours?: string;
  isTruckCartSelected?: boolean;
  isTruckTankSelected?: boolean;
  isMunckSelected: boolean;
  isTransportationSelected?: boolean;
  truckKm?: number;
  isExtraTrailerSelected?: boolean;
  isPowerSwivelSelected?: boolean;
  mobilizationPlace?: string;
  isSuckingTruckSelected?: boolean;
}
