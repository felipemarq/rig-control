import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { efficiencyMappers } from "../../../../../app/services/mappers/efficiencyMappers";
import { customColorToast } from "../../../../../app/utils/customColorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { efficienciesService } from "../../../../../app/services/efficienciesService";
import { AxiosError } from "axios";
import { treatAxiosError } from "../../../../../app/utils/treatAxiosError";
import { Dayjs } from "dayjs";
import { parse, differenceInMinutes } from "date-fns";
import { useEfficiencyById } from "../../../../../app/hooks/efficiencies/useEfficiencyById";
import { PersistanceEfficiency } from "../../../../../app/entities/PersistanceEfficiency";
import { formatIsoStringToHours } from "../../../../../app/utils/formatIsoStringToHours";
import { TemporaryEfficiencyResponse } from "../../../../../app/services/temporaryEfficienciesServices/getById";
import { temporaryEfficienciesServices } from "../../../../../app/services/temporaryEfficienciesServices";
import { useSidebarContext } from "../../../../../app/contexts/SidebarContext";
import { useTemporaryEfficiencyByUserId } from "../../../../../app/hooks/temporaryEfficiencies/useTemporaryEfficiencyByUserId";
import * as Sentry from "@sentry/react";
import { useTheme } from "@/app/contexts/ThemeContext";
type ErrorArgs = { fieldName: string; message: string };

interface UpdateFormContextValue {
  date: Date | undefined;
  remainingMinutes: number | undefined;
  periods: Periods;
  isLoading: boolean;
  userRig: {
    id: string;
    name: string;
    state?: string | undefined;
    isAtive?: boolean | undefined;
    contract: {
      client: {
        id: string;
        name: string;
      };
    };
  }; // Não tenho certeza do tipo exato, então usei `any` por enquanto
  handleDateChange(date: Date): void;
  handleStartHourChange(time: Dayjs | null, timeString: string, id: string): void;
  handleDeletePeriod(id: string): void;
  handleEndHourChange(time: Dayjs | null, timeString: string, id: string): void;
  addPeriod(): void;
  handlePeriodType(id: string, type: string): void;
  handlePeriodClassification(id: string, classification: string): void;
  handleRepairClassification(id: string, repairClassification: string): void;
  handleFluidRatio(id: string, ratio: string | never): void;
  handleEquipmentRatio(id: string, ratio: string | never): void;
  handleDescription(id: string, text: string): void;
  handleSubmitTemporary(periods: Periods): Promise<void>;
  handleSubmit(periods: Periods): Promise<void>;
  handleSave(): void;
  cleanFields(id: string): void;
  isFormValid: boolean;
  isPending: boolean;
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  handleMixTankCheckBox(): void;
  handleMixTankOperatorsCheckBox(): void;
  handleFuelGeneratorCheckBox(): void;
  handleMobilizationCheckbox(): void;
  handleMixTankMonthCheckBox(): void;
  handleDemobilizationCheckbox(): void;
  handleTankMixMobilizationCheckbox(): void;
  handleTankMixDemobilizationCheckbox(): void;
  handleTankMixDTMCheckbox(): void;
  handleTruckCartCheckbox(): void;
  handleTruckTankCheckbox(): void;
  handleTransportationCheckbox(): void;
  handleMunckCheckbox(): void;
  handleTruckKmChange(number: number): void;
  handleExtraTrailerCheckbox(): void;
  handlePowerSwivelCheckbox(): void;
  handleMobilizationPlace(value: string): void;
  handleSuckingTruckCheckbox(): void;
  handlePeriodWell(id: string, well: string): void;
  toggleVisibility(): void;
  handleConfirmButton(): void;
  getPeriodState(periodId: string): boolean;
  isMobilizationOutSelected: boolean;
  handleMobilizationOutCheckbox(): void;
  isConfigsConfirmed: boolean;
  isSuckingTruckSelected: boolean;
  usersRigs: { id: string; name: string }[];
  mobilizationPlace: string;
  isPowerSwivelSelected: boolean;
  isMixTankSelected: boolean;
  isMixTankOperatorsSelected: boolean;
  isMixTankMonthSelected: boolean;
  isFuelGeneratorSelected: boolean;
  isMobilizationSelected: boolean;
  isDemobilizationSelected: boolean;
  isTankMixMobilizationSelected: boolean;
  isTankMixDemobilizationSelected: boolean;
  isTankMixDTMSelected: boolean;
  bobRentHours: string;
  isTruckCartSelected: boolean;
  isTruckTankSelected: boolean;
  isMunckSelected: boolean;
  isFetching: boolean;
  isTransportationSelected: boolean;
  truckKm: number;
  isDateValid: boolean;
  hasRemainingMinutes: boolean;
  isVisible: boolean;
  setError(arg0: ErrorArgs): void;
  removeError(fieldName: string): void;
  getErrorMessageByFildName(fieldName: string): string;
  isExtraTrailerSelected: boolean;
  isModalOpen: boolean;
  closeModal(): void;
  openModal(): void;
  handleConfirmModal(): void;
  temporaryEfficiency: TemporaryEfficiencyResponse | never[];
  updatePeriodState(
    id: string,
    state: boolean
  ): {
    periodId: string;
    isCollapsed: boolean;
  }[];
  handleBobRentHours(time: Dayjs | null, timeString: string): void;
  handleChristmasTreeDisassemblyHours(time: Dayjs | null, timeString: string): void;
  selectedContract:
    | {
        rig: {
          id: string;
          name: string;
          state?: string | undefined;
          isAtive?: boolean | undefined;
          contract: {
            client: {
              id: string;
              name: string;
            };
          };
        };
      }
    | undefined;
}

type Periods = {
  id: string;
  startHour: string;
  endHour: string;
  type: string;
  classification: string;
  repairClassification: string | null;
  fluidRatio: string;
  equipmentRatio: string;
  description: string;
  well: any;
}[];

export const UpdateFormContext = createContext({} as UpdateFormContextValue);

export const UpdateFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { handleToggleNavItem } = useSidebarContext();
  const { primaryColor } = useTheme();
  const { efficiencyId } = useParams<{ efficiencyId: string }>();

  if (typeof efficiencyId === "undefined") {
    // Trate o erro de acordo com a necessidade do seu aplicativo
    // Pode ser um redirecionamento, um erro lançado, ou até mesmo um log.
    throw new Error("efficiencyId is undefined");
  }

  const { efficiency, isFetchingEfficiency } = useEfficiencyById(efficiencyId!);

  const responseEfficiency = efficiency as PersistanceEfficiency;

  const initialPeriods = useMemo(() => {
    const initialPeriods = responseEfficiency?.periods?.map(
      ({
        startHour,
        endHour,
        description,
        type,
        classification,
        repairClassification,
        well,
      }) => {
        return {
          id: uuidv4(),
          startHour: formatIsoStringToHours(startHour),
          endHour: formatIsoStringToHours(endHour),
          type: type,
          classification: classification,
          repairClassification: repairClassification,
          description: description,
          equipmentRatio: "",
          fluidRatio: "",
          well: well?.name ?? "",
        };
      }
    );

    for (let index = 0; index < responseEfficiency?.equipmentRatio?.length; index++) {
      initialPeriods[index] = {
        id: initialPeriods[index].id,
        startHour: initialPeriods[index].startHour,
        endHour: initialPeriods[index].endHour,
        type: initialPeriods[index].type,
        classification: initialPeriods[index].classification,
        repairClassification: initialPeriods[index].repairClassification,
        description: initialPeriods[index].description,
        fluidRatio: initialPeriods[index].fluidRatio,
        equipmentRatio: responseEfficiency.equipmentRatio[index].ratio,
        well: initialPeriods[index].well,
      };
    }

    for (let index = 0; index < responseEfficiency?.fluidRatio?.length; index++) {
      initialPeriods[index] = {
        id: initialPeriods[index].id,
        startHour: initialPeriods[index].startHour,
        endHour: initialPeriods[index].endHour,
        type: initialPeriods[index].type,
        classification: initialPeriods[index].classification,
        repairClassification: initialPeriods[index].repairClassification,
        description: initialPeriods[index].description,
        equipmentRatio: initialPeriods[index].equipmentRatio,
        fluidRatio: responseEfficiency.fluidRatio[index].ratio,
        well: initialPeriods[index].well,
      };
    }

    return initialPeriods;
  }, [responseEfficiency]);

  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date(responseEfficiency.date));
  const [selectedRig, setSelectedRig] = useState<string>(responseEfficiency.rigId);
  const [remainingMinutes, setRemainingMinutes] = useState<number>();
  const [periods, setPeriods] = useState<Periods>(initialPeriods);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { temporaryEfficiency } = useTemporaryEfficiencyByUserId(user?.id!);

  useEffect(() => {
    setPeriods(initialPeriods);
  }, []);

  // const tes = efficiency.periods.map()

  const { isPending: isLoadingEfficiency, mutateAsync } = useMutation({
    mutationFn: efficienciesService.create,
  });
  const queryClient = useQueryClient();

  const [periodsState, setPeriodsState] = useState(() => {
    return initialPeriods?.map(({ id }) => ({
      periodId: id,
      isCollapsed: true,
    }));
  });

  const [errors, setErrors] = useState<Array<ErrorArgs>>([]);

  const setError = ({ fieldName, message }: ErrorArgs) => {
    const errorAlreadyExists = errors.find((error) => error.fieldName === fieldName);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { fieldName, message }]);
  };

  const removeError = (fieldName: string) => {
    setErrors((prevState) => prevState.filter((error) => error.fieldName !== fieldName));
  };

  const getErrorMessageByFildName = (fieldName: string) => {
    let findErrorMessage = errors.find((error) => error.fieldName === fieldName)?.message;

    if (!findErrorMessage) {
      findErrorMessage = "";
    }

    return findErrorMessage;
  };

  const [isVisible, setIsVisible] = useState(true);

  const [isConfigsConfirmed, setConfigsConfirmed] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirmButton = () => {
    toggleVisibility();
    setConfigsConfirmed(true);
  };

  const {
    isPending: isLoadingRemoveEfficiency,
    mutateAsync: mutateAsyncRemoveEfficiency,
  } = useMutation({ mutationFn: efficienciesService.remove });

  const { isPending: isLoadingTemporary, mutateAsync: mutateAsyncTemporaryEfficiency } =
    useMutation({
      mutationFn: temporaryEfficienciesServices.create,
    });

  const handleSubmit = async (periods: Periods) => {
    try {
      await mutateAsyncRemoveEfficiency(efficiencyId!);
      queryClient.invalidateQueries({ queryKey: ["efficiencies"] });
    } catch (error: any | typeof AxiosError) {
      Sentry.captureException(error);
      treatAxiosError(error);
    }

    const { toPersistenceObj } = efficiencyMappers.toPersistance({
      rigId: selectedRig,
      date: date ?? new Date(),
      availableHours: 24,
      periods: periods,
      isMixTankSelected,
      isMixTankOperatorsSelected,
      isMixTankMonthSelected,
      isFuelGeneratorSelected,
      isMobilizationSelected,
      isDemobilizationSelected,
      isTankMixMobilizationSelected,
      isTankMixDemobilizationSelected,
      isTankMixDTMSelected,
      bobRentHours,
      christmasTreeDisassemblyHours,
      isTruckCartSelected,
      isTruckTankSelected,
      isMunckSelected,
      isTransportationSelected,
      truckKm,
      isExtraTrailerSelected,
      isPowerSwivelSelected,
      mobilizationPlace,
      isSuckingTruckSelected,
      isMobilizationOutSelected,
    });

    try {
      await mutateAsync(toPersistenceObj);
      customColorToast("Dados Enviados com Sucesso!", primaryColor, "success");

      setPeriods([
        {
          id: uuidv4(),
          startHour: "00:00",
          endHour: "00:00",
          type: "",
          classification: "",
          fluidRatio: "",
          repairClassification: null,
          equipmentRatio: "",
          description: "",
          well: "",
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["efficiencies", "average"] });

      navigate("/dashboard", { replace: true });
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  };

  const handleSave = () => {
    if (temporaryEfficiency) {
      openModal();
      return;
    }

    handleSubmitTemporary(periods);
  };

  const handleConfirmModal = () => {
    handleSubmitTemporary(periods);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitTemporary = async (periods: Periods) => {
    // Criação do objeto de persistência utilizando o mapeamento dos dados

    const { toPersistenceObj } = efficiencyMappers.toPersistance({
      rigId: selectedRig,
      date: date!,
      availableHours: 24,
      periods: periods,
      isMixTankSelected,
      isMixTankOperatorsSelected,
      isMixTankMonthSelected,
      isFuelGeneratorSelected,
      isMobilizationSelected,
      isDemobilizationSelected,
      isTankMixMobilizationSelected,
      isTankMixDemobilizationSelected,
      isTankMixDTMSelected,
      bobRentHours,
      christmasTreeDisassemblyHours,
      isTruckCartSelected,
      isTruckTankSelected,
      isMunckSelected,
      isTransportationSelected,
      truckKm,
      isExtraTrailerSelected,
      isPowerSwivelSelected,
      mobilizationPlace,
      isSuckingTruckSelected,
      isMobilizationOutSelected,
    });

    try {
      await mutateAsyncTemporaryEfficiency(toPersistenceObj);
      customColorToast("Dados Enviados com Sucesso!", primaryColor, "success");

      setPeriods([
        {
          id: uuidv4(),
          startHour: "00:00",
          endHour: "00:00",
          type: "",
          classification: "",
          fluidRatio: "",
          repairClassification: null,
          equipmentRatio: "",
          description: "",
          well: "",
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["efficiencies", "average"] });

      navigate("/dashboard", { replace: true });
      handleToggleNavItem("dashboard");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  };

  /*  <[{id:string, startHour:string,endHour:string,type: 'WORKING' | 'REPAIR' | '', classification: string}]> */
  const handleStartHourChange = (_time: Dayjs | null, timeString: string, id: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, startHour: timeString } : period;
    });

    setPeriods(newPeriods);
  };

  const handleEndHourChange = (_time: Dayjs | null, timeString: string, id: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, endHour: timeString } : period;
    });

    setPeriods(newPeriods);
  };

  const handlePeriodType = (id: string, type: string) => {
    if (!type) {
      setError({ fieldName: `${id} type`, message: "Obrigatório" });
    } else {
      removeError(`${id} type`);
    }
    const newPeriods = periods.map((period) => {
      if (type === "DTM" && period.id === id) {
        setError({ fieldName: `${id} well`, message: "Obrigatório" });
        return {
          ...period,
          type: type,
          classification: "",
          repairClassification: null,
          well: "",
        };
      }

      if (period.id === id) {
        setError({ fieldName: `${id} classification`, message: "Obrigatório" });

        return {
          ...period,
          type: type,
          classification: "",
          repairClassification: null,
        };
      }

      return period;
    });

    setPeriods(newPeriods);
  };

  const handlePeriodClassification = (id: string, classification: string) => {
    if (!classification) {
      setError({ fieldName: `${id} classification`, message: "Obrigatório" });
    } else {
      removeError(`${id} classification`);
    }
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {
            ...period,
            classification: classification,
            repairClassification: null,
          }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleRepairClassification = (id: string, repairClassification: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? { ...period, repairClassification: repairClassification }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handlePeriodWell = (id: string, well: string) => {
    if (!well) {
      setError({ fieldName: `${id} well`, message: "Obrigatório" });
    } else {
      removeError(`${id} well`);
    }
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {
            ...period,
            well: well,
          }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleFluidRatio = (id: string, ratio: string | never) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, fluidRatio: ratio } : period;
    });

    setPeriods(newPeriods);
  };

  const handleEquipmentRatio = (id: string, ratio: string | never) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, equipmentRatio: ratio } : period;
    });

    setPeriods(newPeriods);
  };

  const getPeriodState = (periodId: string) => {
    const periodState = periodsState.find((period) => period.periodId === periodId);
    return periodState?.isCollapsed ?? false;
  };

  const updatePeriodState = (id: string, state: boolean) => {
    const newStates = periodsState.map(({ periodId, isCollapsed }) => {
      return periodId === id
        ? { periodId, isCollapsed: state }
        : { periodId, isCollapsed };
    });

    setPeriodsState(newStates);

    return newStates;
  };

  const addPeriod = () => {
    const newId = uuidv4();
    setError({ fieldName: `${newId} type`, message: "Obrigatório" });
    setError({ fieldName: `${newId} classification`, message: "Obrigatório" });
    setPeriods([
      ...periods,
      {
        id: newId,
        startHour: periods[periods.length - 1].endHour,
        endHour: "00:00",
        type: "",
        classification: "",
        fluidRatio: "",
        repairClassification: null,
        equipmentRatio: "",
        description: "",
        well: periods[periods.length - 1].well,
      },
    ]);

    const newStates = updatePeriodState(periods[periods.length - 1].id, true);

    setPeriodsState([...newStates, { periodId: newId, isCollapsed: false }]);
  };

  const cleanFields = (id: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {
            ...period,
            type: "",
            classification: "",
            fluidRatio: "",
            equipmentRatio: "",
            description: "",
          }
        : period;
    });

    setPeriods(newPeriods);
  };

  const millisecondsInADay = 1000 * 60 * 60 * 24;

  const getTotalDaysByDate = (date: Date): number => {
    const daysInMilliseconds = Number(date);
    const daysInADay = daysInMilliseconds / millisecondsInADay;
    const intDays = Math.trunc(daysInADay);

    return intDays;
  };

  const isDateValid = date
    ? getTotalDaysByDate(new Date(date)) > getTotalDaysByDate(new Date())
    : false;

  const handleDateChange = (date: Date) => {
    setDate(date);
    if (getTotalDaysByDate(new Date(date)) > getTotalDaysByDate(new Date())) {
      setError({ fieldName: "date", message: "Data Inválida!" });
    } else {
      removeError("date");
    }
  };

  const handleDeletePeriod = (id: string) => {
    removeError(`${id} classification`);
    removeError(`${id} well`);
    removeError(`${id} type`);
    const newPeriods = periods.filter((period) => period.id !== id);

    setPeriods(newPeriods);
  };

  const handleDescription = (id: string, text: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? { ...period, description: text } : period;
    });

    setPeriods(newPeriods);
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
  };

  const calculateTotalMinutes = useCallback(() => {
    let totalMinutes = 0;

    periods?.forEach((period) => {
      const horaInicial = parse(period.startHour, "HH:mm", new Date());
      const horaFinal = parse(period.endHour, "HH:mm", new Date());
      const diferencaMinutos = differenceInMinutes(horaFinal, horaInicial);
      totalMinutes += diferencaMinutos;
    });

    return 1439 - totalMinutes;
  }, [periods]);

  useEffect(() => {
    const newMinutes = calculateTotalMinutes();
    setRemainingMinutes(newMinutes);
  }, [periods]);

  const isFormValid = Boolean(date && errors.length === 0);

  const hasRemainingMinutes = remainingMinutes !== 0;

  const isPending = remainingMinutes !== 0;

  const userRig = user?.rigs[0].rig!;

  const usersRigs =
    user?.rigs.map(({ rig: { id, name } }) => {
      return {
        id,
        name,
      };
    }) || [];

  const selectedContract = user?.rigs.find(({ rig: { id } }) => {
    return id === selectedRig;
  });

  //Configurações de formulário adicionais

  //SPT 88

  const [isMixTankSelected, setIsMixTankSelected] = useState(false);
  const [isMixTankMonthSelected, setIsMixTankMonthSelected] = useState(
    !!efficiency?.hasMixTankMonthRent
  );
  const [isMixTankOperatorsSelected, setIsMixTankOperatorsSelected] = useState(
    !!efficiency?.hasMixTankOperator
  );
  const [isTankMixMobilizationSelected, setIsTankMixMobilizationSelected] = useState(
    !!efficiency?.hasMixTankMobilization
  );
  const [isTankMixDemobilizationSelected, setIsTankMixDemobilizationSelected] = useState(
    !!efficiency?.hasMixTankDemobilization
  );
  const [isFuelGeneratorSelected, setIsFuelGeneratorSelected] = useState(
    !!efficiency?.hasGeneratorFuel
  );
  const [isMobilizationSelected, setIsMobilizationSelected] = useState(
    !!efficiency?.hasMobilization
  );
  const [isDemobilizationSelected, setIsDemobilizationSelected] = useState(
    !!efficiency?.hasDemobilization
  );
  const [isTankMixDTMSelected, setIsTankMixDTMSelected] = useState(
    !!efficiency?.hasMixTankDtm
  );
  const [isTruckTankSelected, setIsTruckTankSelected] = useState(
    !!efficiency?.hasTruckTank
  );
  const [isTruckCartSelected, setIsTruckCartSelected] = useState(
    !!efficiency?.hasTruckCartRent
  );
  const [isMunckSelected, setIsMunckSelected] = useState(!!efficiency?.hasMunck);
  const [isTransportationSelected, setIsTransportationSelected] = useState(
    !!efficiency?.hasTransportation
  );
  const [truckKm, setTruckKm] = useState(efficiency?.truckKmHours ?? 0);
  const [isExtraTrailerSelected, setIsExtraTrailerSelected] = useState(
    !!efficiency?.hasExtraTrailer
  );
  const [isPowerSwivelSelected, setIsPowerSwivelSelected] = useState(
    !!efficiency?.hasPowerSwivel
  );
  const [isMobilizationOutSelected, setIsMobilizationOutSelected] = useState(
    efficiency?.hasMobilizationOut ?? false
  );
  const [mobilizationPlace, setMobilizationPlace] = useState("");
  const [isSuckingTruckSelected, setIsSuckingTruckSelected] = useState(
    !!efficiency?.hasSuckingTruck
  );
  const [christmasTreeDisassemblyHours, setChristmasTreeDisassemblyHours] =
    useState<string>("");
  const [bobRentHours, setBobRentHours] = useState<string>("");

  const handleMixTankCheckBox = () => {
    setIsMixTankSelected((prevState) => !prevState);
  };

  const handleMixTankMonthCheckBox = () => {
    setIsMixTankMonthSelected((prevState) => !prevState);
  };

  const handleMixTankOperatorsCheckBox = () => {
    setIsMixTankOperatorsSelected((prevState) => !prevState);
  };

  const handleTankMixDemobilizationCheckbox = useCallback(() => {
    setIsTankMixDemobilizationSelected((prevState) => !prevState);
  }, []);

  const handleFuelGeneratorCheckBox = () => {
    setIsFuelGeneratorSelected((prevState) => !prevState);
  };

  const handleMobilizationCheckbox = useCallback(() => {
    setIsMobilizationSelected((prevState) => !prevState);
    setMobilizationPlace("");
  }, []);

  const handleMobilizationOutCheckbox = useCallback(() => {
    setIsMobilizationOutSelected((prevState) => !prevState);
    setIsMobilizationSelected(false);
  }, []);

  const handleDemobilizationCheckbox = useCallback(() => {
    setIsDemobilizationSelected((prevState) => !prevState);
  }, []);

  const handleTankMixDTMCheckbox = useCallback(() => {
    setIsTankMixDTMSelected((prevState) => !prevState);
  }, []);

  const handleBobRentHours = useCallback((_time: Dayjs | null, timeString: string) => {
    setBobRentHours(timeString);
  }, []);

  const handleTankMixMobilizationCheckbox = useCallback(() => {
    setIsTankMixMobilizationSelected((prevState) => !prevState);
  }, []);

  const handleChristmasTreeDisassemblyHours = useCallback(
    (_time: Dayjs | null, timeString: string) => {
      setChristmasTreeDisassemblyHours(timeString);
    },
    []
  );

  //===========================================

  // 3R - 76

  const handleTruckCartCheckbox = useCallback(() => {
    setIsTruckCartSelected((prevState) => !prevState);
  }, []);

  const handleTruckTankCheckbox = useCallback(() => {
    setIsTruckTankSelected((prevState) => !prevState);
  }, []);

  const handleMunckCheckbox = useCallback(() => {
    setIsMunckSelected((prevState) => !prevState);
  }, []);

  const handleTransportationCheckbox = useCallback(() => {
    setIsTransportationSelected((prevState) => !prevState);
  }, []);

  const handleTruckKmChange = (number: number) => {
    setTruckKm(number);
  };

  const handleExtraTrailerCheckbox = useCallback(() => {
    setIsExtraTrailerSelected((prevState) => !prevState);
  }, []);

  const handlePowerSwivelCheckbox = useCallback(() => {
    setIsPowerSwivelSelected((prevState) => !prevState);
  }, []);

  const handleMobilizationPlace = (value: string) => {
    setMobilizationPlace(value);
  };

  const handleSuckingTruckCheckbox = useCallback(() => {
    setIsSuckingTruckSelected((prevState) => !prevState);
  }, []);

  return (
    <UpdateFormContext.Provider
      value={{
        isFetching:
          isLoadingRemoveEfficiency ||
          isFetchingEfficiency ||
          isLoadingEfficiency ||
          isLoadingTemporary,
        date,
        handleChangeRig,
        handleDateChange,
        handleStartHourChange,
        handleDeletePeriod,
        handleEndHourChange,
        addPeriod,
        periods,
        handlePeriodType,
        handlePeriodClassification,
        handleFluidRatio,
        handleEquipmentRatio,
        remainingMinutes,
        isFormValid,
        hasRemainingMinutes,
        handleDescription,
        handleSubmit,
        cleanFields,
        handleMobilizationOutCheckbox,
        isMobilizationOutSelected,
        handlePeriodWell,
        isLoading: isLoadingEfficiency || isLoadingRemoveEfficiency || isLoadingTemporary,
        userRig,
        usersRigs,
        isPending,
        handleMixTankCheckBox,
        isMixTankSelected,
        handleMixTankOperatorsCheckBox,
        isMixTankOperatorsSelected,
        isMixTankMonthSelected,
        handleMixTankMonthCheckBox,
        isFuelGeneratorSelected,
        handleFuelGeneratorCheckBox,
        handleMobilizationCheckbox,
        isMobilizationSelected,
        isDemobilizationSelected,
        handleDemobilizationCheckbox,
        isTankMixMobilizationSelected,
        isTankMixDemobilizationSelected,
        handleTankMixMobilizationCheckbox,
        handleTankMixDemobilizationCheckbox,
        handleTankMixDTMCheckbox,
        isTankMixDTMSelected,
        bobRentHours,
        isDateValid,
        handleBobRentHours,
        handleChristmasTreeDisassemblyHours,
        isTruckCartSelected,
        handleTruckCartCheckbox,
        isTruckTankSelected,
        handleTruckTankCheckbox,
        isMunckSelected,
        handleMunckCheckbox,
        handleConfirmButton,
        isConfigsConfirmed,
        handleSubmitTemporary,
        updatePeriodState,
        isTransportationSelected,
        handleTransportationCheckbox,
        handleTruckKmChange,
        truckKm,
        isModalOpen,
        closeModal,
        openModal,
        handleConfirmModal,
        isVisible,
        toggleVisibility,
        handleSave,
        handleExtraTrailerCheckbox,
        isExtraTrailerSelected,
        isPowerSwivelSelected,
        handlePowerSwivelCheckbox,
        mobilizationPlace,
        handleMobilizationPlace,
        isSuckingTruckSelected,
        handleSuckingTruckCheckbox,
        selectedRig,
        setError,
        removeError,
        getErrorMessageByFildName,
        handleRepairClassification,
        selectedContract,
        temporaryEfficiency,
        getPeriodState,
      }}
    >
      {children}
    </UpdateFormContext.Provider>
  );
};
