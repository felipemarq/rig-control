import { UF } from 'src/modules/rigs/entities/UF';
import { PeriodType } from './PeriodType';

export type PersistanceEfficiency = {
  availableHours: number;
  commercialHours: number;
  billedScheduledStopHours?: number;
  unbilledScheduledStopHours?: number;
  standByHours: number;
  date: string;
  id: string;
  well: string;
  rigId: string;
  userId: string;
  user: { name: string };
  isEditable: boolean | null;
  rig: { name: string; state: UF };
  periods: {
    id: string;
    efficiencyId: string;
    startHour: string;
    endHour: string;
    type: PeriodType;
    classification: string;
    description: string;
    repairClassification: string | null;
    well: {
      id: string;
      name: string;
    };
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
  dtmHours: number;
  christmasTreeDisassemblyHours: number;
  bobRentHours: number;
  hasDemobilization: boolean;
  hasMobilization: boolean | null;
  hasExtraTrailer: boolean;
  hasGeneratorFuel: boolean;
  hasMixTankDemobilization: boolean;
  hasMixTankDtm: boolean;
  hasMixTankHourRent: boolean;
  hasMixTankMobilization: boolean;
  hasMixTankMonthRent: boolean;
  hasMixTankOperator: boolean;
  hasMunck: boolean;
  hasPowerSwivel: boolean;
  hasSuckingTruck: boolean;
  hasTransportation: boolean;
  hasTruckCartRent: boolean;
  truckKmHours: number;
  hasTruckTank: boolean;
  repairHours?: number;
  glossHours?: number;
  Billing: {
    availableHourAmount: number;
    mobilizationAmount: number;
    demobilizationAmount: number;
    extraTrailerAmount: number;
    powerSwivelAmount: number;
    truckCartRentAmount: number;
    transportationAmount: number;
    bobRentAmount: number;
    mixTankMonthRentAmount: number;
    mixTankHourRentAmount: number;
    mixTankOperatorAmount: number;
    mixTankDemobilizationAmount: number;
    mixTankDtmAmount: number;
    mixTankMobilizationAmount: number;
    christmasTreeDisassemblyAmount: number;
  };
};
