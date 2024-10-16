import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { isAfter, isBefore, differenceInMinutes } from 'date-fns';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { BillingConfigurationsRepository } from 'src/shared/database/repositories/billingConfiguration.repositories';
import { BillingRepository } from 'src/shared/database/repositories/billing.repositories';
import { DeletionRequestRepository } from 'src/shared/database/repositories/deletionRequests.repositories';
import { RequestStatus } from '../deletion-requests/entities/deletion-request.entity';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';
import { PeriodDto } from './dto/create-period-dto';
import { TemporaryEfficienciesRepository } from 'src/shared/database/repositories/temporaryEfficienciesRepositories';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { PeriodType } from './entities/PeriodType';
import { PeriodClassification } from './entities/PeriodClassification';
import { translateType } from 'src/shared/utils/translateType';
import { translateRepairClassification } from 'src/shared/utils/translateRepairClassification';
import { RepairClassification } from './entities/RepairClassification';
import { translateClassification } from 'src/shared/utils/translateClassifications';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class EfficienciesService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
    private readonly billingConfigRepo: BillingConfigurationsRepository,
    private readonly billingRepo: BillingRepository,
    private readonly wellsRepo: WellsRepository,
    private readonly deletionRequestRepo: DeletionRequestRepository,
    private readonly temporaryEfficiencyRepo: TemporaryEfficienciesRepository,
  ) {}

  private isTimeValid(startHour: string, endHour: string): boolean {
    const startTime = new Date(startHour);
    const endTime = new Date(endHour);
    return isBefore(startTime, endTime);
  }

  private validatePeriodsTime(periods: PeriodDto[]) {
    for (let i = 0; i < periods.length; i++) {
      const currentPeriod = periods[i];

      if (i > 0) {
        const previousPeriod = periods[i - 1];
        if (
          isAfter(
            new Date(currentPeriod.startHour),
            new Date(previousPeriod.endHour),
          )
        ) {
          throw new ConflictException(
            'Horários de período se sobrepõem ou são inválidos.',
          );
        }
      }
      if (!this.isTimeValid(currentPeriod.startHour, currentPeriod.endHour)) {
        throw new ConflictException(
          'Horário inválido. A hora de início deve ser antes da hora final.',
        );
      }
    }
  }

  async create(createEfficiencyDto: CreateEfficiencyDto, userId: string) {
    const {
      rigId,
      date,
      well,
      availableHours,
      periods,
      fluidRatio,
      equipmentRatio,
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
      createdAt,
    } = createEfficiencyDto;

    /**
     * Checks if the provided rig ID belongs to the specified user.
     * If the rig doesn't belong to the user, it throws an UnauthorizedException.
     * @param rigId The ID of the rig.
     * @param userId The ID of the user.
     */
    const rigBelongsToUser = await this.userRigsRepo.findFirst({
      where: { userId, rigId },
    });

    if (!rigBelongsToUser) {
      throw new UnauthorizedException(
        'O usuário não é vinculado a sonda selecionada!',
      );
    }

    /**
     * Checks if an efficiency entry already exists for the given rig ID and date.
     * If an entry already exists, it throws a ConflictException.
     * @param rigId The ID of the rig.
     * @param date The date for which to check the existence of an efficiency entry.
     */
    const efficiencyAlreadyExists = await this.efficiencyRepo.findFirst({
      where: { rigId, date },
    });

    if (efficiencyAlreadyExists) {
      throw new ConflictException('Data já preenchida!');
    }

    const efficiencyTemporaryExists =
      await this.temporaryEfficiencyRepo.findFirst({
        where: { rigId, date },
      });

    if (efficiencyTemporaryExists) {
      await this.temporaryEfficiencyRepo.delete({
        where: { id: efficiencyTemporaryExists.id },
      });
    }

    /**
     * Checks if each well in the provided periods exists in the database.
     * If a well doesn't exist, it creates a new entry for it.
     * @param periods The array of periods containing well IDs.
     */
    for (const { wellId } of periods) {
      const wellExist = await this.wellsRepo.findFirst({
        where: { name: wellId },
      });

      if (!wellExist) {
        await this.wellsRepo.create({ data: { name: wellId } });
      }
    }

    /**
     * Retrieves the billing configuration for the specified rig.
     * @param rigId The ID of the rig for which to retrieve the billing configuration.
     */
    const rigBillingConfiguration = await this.billingConfigRepo.findFisrt({
      where: { rigId },
    });

    /**
     * Checks if the periods provided overlap or are invalid.
     * @param periods The array of periods to check.
     */
    this.validatePeriodsTime(periods);

    console.log(periods);

    /**
     * Constructs the efficiency data object with the provided information.
     * @param createEfficiencyDto The DTO containing the information to construct the efficiency data object.
     * @returns The constructed efficiency data object.
     */
    const efficiencyData = {
      date,
      well,
      availableHours,
      dtmHours: 0,
      rigId,
      createdAt,
      userId,
      christmasTreeDisassemblyHours: christmasTreeDisassemblyHours,
      bobRentHours: bobRentHours,
      hasDemobilization: isDemobilizationSelected,
      hasMobilization: isMobilizationSelected,
      hasExtraTrailer: isExtraTrailerSelected,
      hasGeneratorFuel: isFuelGeneratorSelected,
      hasMixTankDemobilization: isTankMixDemobilizationSelected,
      hasMixTankDtm: isTankMixDTMSelected,
      hasMixTankHourRent: isMixTankSelected,
      hasMixTankMobilization: isTankMixMobilizationSelected,
      hasMixTankMonthRent: isMixTankMonthSelected,
      hasMixTankOperator: isMixTankOperatorsSelected,
      hasMunck: isMunckSelected,
      hasPowerSwivel: isPowerSwivelSelected,
      hasSuckingTruck: isSuckingTruckSelected,
      hasTransportation: isTransportationSelected,
      hasTruckCartRent: isTruckCartSelected,
      hasTruckTank: isTruckTankSelected,
      truckKmHours: truckKm,
      periods: {
        createMany: {
          data: periods,
        },
      },
    };

    if (equipmentRatio?.length > 0) {
      efficiencyData['equipmentRatio'] = {
        createMany: {
          data: equipmentRatio,
        },
      };
    }

    if (fluidRatio?.length > 0) {
      efficiencyData['fluidRatio'] = {
        createMany: {
          data: fluidRatio,
        },
      };
    }

    //criando valores de faturamento
    // Talvez mudar isso aqui de lugar

    let billedScheduledStopTotalHours = 0;
    let unbilledScheduledStopTotalHours = 0;
    let standByTotalHours = 0;
    let dtmLt20TotalHours = 0;
    let dtmBt20And50TotalHours = 0;
    let dtmGt50TotalHours = 0;
    let dtmLt20TotalAmmount = 0;
    let dtmBt20and50TotalAmmout = 0;
    let dtmGt50TotalAmount = 0;
    let fluidLt20TotalAmmount = 0;
    let fluidBt20And50TotalAmmount = 0;
    let fluidGt50TotalAmmount = 0;
    let equipmentLt20TotalAmmount = 0;
    let equipmentBt20And50TotalAmmount = 0;
    let equipmentGt50TotalAmmount = 0;
    let mobilizationTotalAmount = 0;
    let demobilizationTotalAmount = 0;
    let extraTrailerTotalAmount = 0;
    let powerSwivelTotalAmount = 0;
    let truckCartRentTotalAmount = 0;
    let transportationTotalAmount = 0;
    let truckKmTotalAmount = 0;
    let bobRentTotalAmount = 0;
    let truckTankTotalAmount = 0;
    let munckTotalAmount = 0;
    let mixTankMonthRentTotalAmount = 0;
    let mixTankHourRentTotalAmount = 0;
    let generatorFuelTotalAmount = 0;
    let mixTankOperatorTotalAmount = 0;
    let mixTankDTMTotalAmount = 0;
    let mixTankMobilizationTotalAmount = 0;
    let mixTankDemobilizationTotalAmount = 0;
    let suckingTruckTotalAmount = 0;
    let totalGlossHours = 0;
    let totalRepairHours = 0;

    const wells = await this.wellsRepo.findAll({});

    /**
     * Iterates through each period, updating wellId based on the name found in wells array.
     * Calculates the difference in minutes between start and end hour for each period.
     * Updates total amounts and hours based on period type and classification.
     * @param periods The array of periods to iterate through.
     * @param wells The array of wells to search for matching names.
     */

    const getDiffInMinutes = (finalHour: Date, initialHour: Date) => {
      // Get the ISO hour from the finalHour
      const isoHour = finalHour.toISOString().split('T')[1];

      // Adjust endDate if isoHour is '23:59'
      let endDate = finalHour;
      if (isoHour.slice(0, 5) === '23:59') {
        return differenceInMinutes(endDate, initialHour) + 1; // Adding 1 minute
      }

      // Return the difference in minutes between endDate and initialHour
      return differenceInMinutes(endDate, initialHour);
    };
    periods.forEach(
      ({ type, startHour, endHour, classification, wellId }, index) => {
        // Find the corresponding well ID in the wells array
        const { id: wellIdFound } = wells.find(({ name }) => wellId === name);

        // Update wellId for the current period
        periods[index].wellId = wellIdFound;

        // Convert startHour and endHour to Date objects
        const horaInicial = new Date(startHour);
        const horaFinal = new Date(endHour);

        // Function to calculate the difference in minutes between two dates

        // Calculate the difference in minutes between start and end hour
        const diffInMinutes = getDiffInMinutes(horaFinal, horaInicial);

        // Update total amounts and hours based on period type and classification
        if (type === 'DTM') {
          if (classification === 'LT20') {
            dtmLt20TotalAmmount = 1;
            dtmLt20TotalHours += diffInMinutes / 60;
          }

          if (classification === 'BT20AND50') {
            dtmBt20and50TotalAmmout = 1;
            dtmBt20And50TotalHours += diffInMinutes / 60;
          }

          if (classification === 'GT50') {
            dtmGt50TotalAmount = 1;
            dtmGt50TotalHours += diffInMinutes / 60;
          }
        }
        billedScheduledStopTotalHours = 0;

        if (
          type === 'SCHEDULED_STOP' &&
          classification === 'BILLED_SCHEDULED_STOP'
        ) {
          billedScheduledStopTotalHours += diffInMinutes / 60;
        }

        if (
          type === 'SCHEDULED_STOP' &&
          classification === 'UNBILLED_SCHEDULED_STOP'
        ) {
          unbilledScheduledStopTotalHours += diffInMinutes / 60;
        }

        if (type === 'STAND_BY') {
          standByTotalHours += diffInMinutes / 60;
        }

        if (type === 'REPAIR') {
          totalRepairHours += diffInMinutes / 60;
        }

        if (type === 'GLOSS') {
          totalGlossHours += diffInMinutes / 60;
        }

        // calcular aquis
      },
    );

    if (equipmentRatio?.length) {
      equipmentRatio.forEach(({ ratio }) => {
        if (ratio === 'LT20') {
          equipmentLt20TotalAmmount++;
        }

        if (ratio === 'BT20AND50') {
          equipmentBt20And50TotalAmmount++;
        }

        if (ratio === 'GT50') {
          equipmentGt50TotalAmmount++;
        }
      });
    }

    if (fluidRatio?.length) {
      fluidRatio.forEach(({ ratio }) => {
        if (ratio === 'LT20') {
          fluidLt20TotalAmmount++;
        }

        if (ratio === 'BT20AND50') {
          fluidBt20And50TotalAmmount++;
        }

        if (ratio === 'GT50') {
          fluidGt50TotalAmmount++;
        }
      });
    }

    const availableHourAmount =
      availableHours * rigBillingConfiguration.availableHourTax;

    const scheduledStopAmount =
      billedScheduledStopTotalHours * rigBillingConfiguration.availableHourTax;

    const standByHourAmount =
      standByTotalHours * rigBillingConfiguration.standByHourTax;
    const unbilledScheduledStopTotalAmount =
      unbilledScheduledStopTotalHours *
      rigBillingConfiguration.availableHourTax;

    const glossHourAmount =
      totalGlossHours * rigBillingConfiguration.availableHourTax;

    const repairHourAmount =
      totalRepairHours * rigBillingConfiguration.availableHourTax;
    const dtmLt20Amount =
      dtmLt20TotalAmmount * rigBillingConfiguration.dtmLt20Tax;

    const dtmBt20And50Amount =
      dtmBt20and50TotalAmmout * rigBillingConfiguration.dtmBt20And50Tax;

    const dtmGt50Amount =
      dtmGt50TotalAmount * rigBillingConfiguration.dtmGt50Tax;

    const fluidLt20Amount =
      fluidLt20TotalAmmount * rigBillingConfiguration.fluidRatioLt20Tax;

    const fluidBt20And50Amount =
      fluidBt20And50TotalAmmount *
      rigBillingConfiguration.fluidRatioBt20And50Tax;

    const fluidGt50Amount =
      fluidGt50TotalAmmount * rigBillingConfiguration.fluidRatioGt50Tax;

    const equipmentLt20Amount =
      equipmentLt20TotalAmmount * rigBillingConfiguration.equipmentRatioLt20Tax;

    const equipmentBt20And50Amount =
      equipmentBt20And50TotalAmmount *
      rigBillingConfiguration.equipmentRatioBt20And50Tax;

    const equipmentGt50Amount =
      equipmentGt50TotalAmmount * rigBillingConfiguration.equipmentRatioGt50Tax;

    const dtmHourAmount =
      (dtmLt20TotalHours + dtmBt20And50TotalHours + dtmGt50TotalHours) *
      rigBillingConfiguration.dtmHourTax;

    const christmasTreeDisassemblyAmount =
      christmasTreeDisassemblyHours *
      rigBillingConfiguration.christmasTreeDisassemblyTax;

    const calculateSelectedValues = (selection: boolean, taxString: string) => {
      return selection ? rigBillingConfiguration[taxString] : 0;
    };

    powerSwivelTotalAmount = calculateSelectedValues(
      isPowerSwivelSelected,
      'powerSwivelTax',
    );

    mixTankDemobilizationTotalAmount = calculateSelectedValues(
      isTankMixDemobilizationSelected,
      'mixTankDemobilizationTax',
    );

    mixTankMobilizationTotalAmount = calculateSelectedValues(
      isTankMixMobilizationSelected,
      'mixTankMobilizationTax',
    );

    mixTankDTMTotalAmount = calculateSelectedValues(
      isTankMixDTMSelected,
      'mixTankDtmTax',
    );

    mixTankOperatorTotalAmount = calculateSelectedValues(
      isMixTankOperatorsSelected,
      'mixTankOperatorTax',
    );

    mixTankMonthRentTotalAmount = calculateSelectedValues(
      isMixTankMonthSelected,
      'mixTankMonthRentTax',
    );

    mixTankHourRentTotalAmount = calculateSelectedValues(
      isMixTankSelected,
      'mixTankHourRentTax',
    );

    generatorFuelTotalAmount = calculateSelectedValues(
      isFuelGeneratorSelected,
      'generatorFuelTax',
    );

    munckTotalAmount = calculateSelectedValues(isMunckSelected, 'munckTax');

    truckTankTotalAmount = calculateSelectedValues(
      isTruckTankSelected,
      'truckTankTax',
    );

    mobilizationTotalAmount = calculateSelectedValues(
      isMobilizationSelected,
      'mobilization',
    );

    demobilizationTotalAmount = calculateSelectedValues(
      isDemobilizationSelected,
      'demobilization',
    );

    extraTrailerTotalAmount = calculateSelectedValues(
      isExtraTrailerSelected,
      'extraTrailerTax',
    );

    suckingTruckTotalAmount = calculateSelectedValues(
      isSuckingTruckSelected,
      'suckingTruckTax',
    );

    transportationTotalAmount = calculateSelectedValues(
      isTransportationSelected,
      'transportationTax',
    );

    truckCartRentTotalAmount = calculateSelectedValues(
      isTruckCartSelected,
      'truckCartRentTax',
    );

    bobRentTotalAmount = rigBillingConfiguration.bobRentTax * bobRentHours;

    truckKmTotalAmount = rigBillingConfiguration.truckKmTax * truckKm;

    const totalAmmount =
      availableHourAmount +
      dtmHourAmount +
      dtmLt20Amount +
      dtmBt20And50Amount +
      dtmGt50Amount +
      fluidLt20Amount +
      fluidBt20And50Amount +
      fluidGt50Amount +
      equipmentLt20Amount +
      equipmentBt20And50Amount +
      equipmentGt50Amount +
      christmasTreeDisassemblyAmount +
      mixTankDemobilizationTotalAmount +
      mixTankMobilizationTotalAmount +
      mixTankDTMTotalAmount +
      mixTankOperatorTotalAmount +
      mixTankMonthRentTotalAmount +
      mixTankHourRentTotalAmount +
      generatorFuelTotalAmount +
      munckTotalAmount +
      truckTankTotalAmount +
      mobilizationTotalAmount +
      extraTrailerTotalAmount +
      powerSwivelTotalAmount +
      suckingTruckTotalAmount +
      transportationTotalAmount +
      truckCartRentTotalAmount +
      bobRentTotalAmount +
      truckKmTotalAmount +
      scheduledStopAmount +
      standByHourAmount;

    efficiencyData['dtmHours'] =
      dtmLt20TotalHours + dtmGt50TotalHours + dtmBt20And50TotalHours;

    const efficiency = await this.efficiencyRepo.create({
      data: {
        ...efficiencyData,
        glossHours: totalGlossHours,
        repairHours: totalRepairHours,
        standByHours: standByTotalHours,
        unbilledScheduledStopHours: unbilledScheduledStopTotalHours,
        billedScheduledStopHours: billedScheduledStopTotalHours,
      },
    });

    await this.billingRepo.create({
      data: {
        christmasTreeDisassemblyAmount,
        mixTankDemobilizationAmount: mixTankDemobilizationTotalAmount,
        mixTankDtmAmount: mixTankDTMTotalAmount,
        mixTankMobilizationAmount: mixTankMobilizationTotalAmount,
        mixTankOperatorAmount: mixTankOperatorTotalAmount,
        munckAmount: munckTotalAmount,
        truckTankAmount: truckTankTotalAmount,
        bobRentAmount: bobRentTotalAmount,
        demobilizationAmount: demobilizationTotalAmount,
        extraTrailerAmount: extraTrailerTotalAmount,
        generatorFuelAmount: generatorFuelTotalAmount,
        mixTankHourRentAmount: mixTankHourRentTotalAmount,
        mixTankMonthRentAmount: mixTankMonthRentTotalAmount,
        mobilizationAmount: mobilizationTotalAmount,
        powerSwivelAmount: powerSwivelTotalAmount,
        suckingTruckAmount: suckingTruckTotalAmount,
        transportationAmount: transportationTotalAmount,
        truckCartRentAmount: truckCartRentTotalAmount,
        truckKmAmount: truckKmTotalAmount,
        dtmHourAmount,
        availableHourAmount,
        scheduledStopAmount,
        glossHourAmount,
        repairHourAmount,
        unbilledScheduledStopAmount: unbilledScheduledStopTotalAmount,
        dtmLt20Amount,
        dtmBt20And50Amount,
        dtmGt50Amount,
        fluidLt20Amount,
        fluidBt20And50Amount,
        fluidGt50Amount,
        equipmentLt20Amount,
        equipmentBt20And50Amount,
        equipmentGt50Amount,
        date,
        efficiencyId: efficiency.id,
        rigId,
        total: totalAmmount,
        standByHourAmount,
      },
    });

    return efficiency;
  }

  /**
   * Returns all efficiencies for a given rig and date range.
   * @param filters - The filters to apply to the query.
   * @returns The efficiencies that match the specified criteria.
   */
  async findAllByRigId(filters: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    const rigExists = await this.rigsRepo.findUnique({
      where: {
        id: filters.rigId,
      },
    });

    if (!rigExists) {
      throw new NotFoundException('Sonda não encontrada');
    }
    const efficiencies = await this.efficiencyRepo.findMany({
      where: {
        rigId: filters.rigId,
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        well: true,
        rigId: true,
        userId: true,
        date: true,
        availableHours: true,
        periods: {
          select: {
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            repairClassification: true,
            description: true,
            type: true,
            well: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        christmasTreeDisassemblyHours: true,
        bobRentHours: true,
        hasDemobilization: true,
        hasMobilization: true,
        hasExtraTrailer: true,
        hasGeneratorFuel: true,
        hasMixTankDemobilization: true,
        hasMixTankDtm: true,
        hasMixTankHourRent: true,
        hasMixTankMobilization: true,
        hasMixTankMonthRent: true,
        hasMixTankOperator: true,
        hasMunck: true,
        hasPowerSwivel: true,
        hasSuckingTruck: true,
        hasTransportation: true,
        hasTruckCartRent: true,
        truckKmHours: true,
        dtmHours: true,
        hasTruckTank: true,
        repairHours: true,
        user: { select: { name: true } },
        rig: { select: { name: true, state: true, stateFlagImagePath: true } },
        fluidRatio: {
          select: {
            ratio: true,
          },
        },
        equipmentRatio: {
          select: {
            ratio: true,
          },
        },
      },
    });

    return efficiencies;
  }

  async pdfReport(
    response: Response,
    filters: {
      rigId: string;
      startDate: string;
      endDate: string;
    },
  ) {
    const rigExists = await this.rigsRepo.findUnique({
      where: {
        id: filters.rigId,
      },
    });

    if (!rigExists) {
      throw new NotFoundException('Sonda não encontrada');
    }

    const efficiencies = await this.efficiencyRepo.findMany({
      where: {
        rigId: filters.rigId,
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        well: true,
        date: true,
        availableHours: true,
        standByHours: true,
        repairHours: true,
        glossHours: true,
      },
    });

    // Criação do documento PDF com tamanho de página A4
    const doc = new PDFDocument({
      size: 'A4', // Definimos o tamanho da página como A4
      margin: 30,
    });

    // Configurações de resposta para o navegador fazer o download
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio.pdf',
    );
    response.setHeader('Content-Type', 'application/pdf');

    // Definir o fluxo de resposta do documento para o cliente
    doc.pipe(response);

    // Adicionar título ao PDF
    doc
      .fontSize(14)
      .text('Relatório de Operação', { align: 'center', underline: true });
    doc.moveDown(1.5);

    // Função para desenhar uma linha da tabela
    const drawRow = (columns: string[], y: number) => {
      let x = doc.page.margins.left;
      columns.forEach((text, i) => {
        const colWidth = [90, 120, 100, 100, 100, 100][i]; // Defina as larguras das colunas
        doc.text(text, x, y, { width: colWidth, align: 'left' });
        x += colWidth; // Avança para a próxima coluna
      });
    };

    // Função para verificar se precisa de nova página
    const checkPageEnd = (yPosition: number) => {
      const pageHeight = doc.page.height;
      const bottomMargin = 50; // Definir margem inferior
      if (yPosition > pageHeight - bottomMargin) {
        doc.addPage(); // Adiciona nova página se passar do limite
        return doc.page.margins.top; // Retorna a nova posição de Y no topo da nova página
      }
      return yPosition;
    };

    // Definir tamanhos de fonte menores para cabeçalhos e dados
    const headerFontSize = 10;
    const dataFontSize = 9;

    // Cabeçalhos da tabela
    const headers = [
      'Dia',
      'Poço',
      'Hrs. Operando',
      'Hrs. StandBy',
      'Hrs. Glosa',
      'Hrs. Reparo',
    ];

    // Desenhar cabeçalhos
    doc.fontSize(headerFontSize).font('Helvetica-Bold');
    let currentY = doc.y; // Posição atual no eixo Y
    drawRow(headers, currentY);
    currentY = doc.y + 15; // Incrementa o Y após os cabeçalhos

    // Desenhar os dados da tabela
    doc.fontSize(dataFontSize).font('Helvetica');
    efficiencies.forEach((efficiency) => {
      currentY = checkPageEnd(currentY); // Verifica se precisa de nova página antes de desenhar a linha

      const row = [
        efficiency.date.toISOString().split('T')[0], // Formata a data
        efficiency.well || 'N/A',
        efficiency.availableHours?.toFixed() ?? '0',
        efficiency.standByHours?.toFixed() ?? '0',
        efficiency.glossHours?.toFixed() ?? '0',
        efficiency.repairHours?.toFixed() ?? '0',
      ];

      drawRow(row, currentY);
      currentY += 15; // Incrementa a posição Y para a próxima linha
    });

    // Finalizar o documento
    doc.end();
  }

  async excelReport(efficiencyId: string, response: Response) {
    const efficiency = await this.efficiencyRepo.findUnique({
      where: {
        id: efficiencyId,
      },
      select: {
        id: true,
        date: true,
        availableHours: true,
        rigId: true,
        userId: true,
        christmasTreeDisassemblyHours: true,
        bobRentHours: true,
        hasDemobilization: true,
        hasExtraTrailer: true,
        hasGeneratorFuel: true,
        hasMixTankDemobilization: true,
        hasMixTankDtm: true,
        hasMixTankHourRent: true,
        hasMixTankMobilization: true,
        hasMixTankMonthRent: true,
        hasMixTankOperator: true,
        hasMunck: true,
        hasPowerSwivel: true,
        hasSuckingTruck: true,
        hasTransportation: true,
        hasTruckCartRent: true,
        truckKmHours: true,
        well: true,
        hasTruckTank: true,
        repairHours: true,
        isEditable: true,
        rig: true,
        standByHours: true,
        user: {
          select: {
            name: true,
          },
        },
        periods: {
          select: {
            efficiencyId: true,
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            description: true,
            type: true,
            repairClassification: true,
            well: true,
          },
          orderBy: { startHour: 'asc' },
        },
        equipmentRatio: { select: { ratio: true } },
        fluidRatio: { select: { ratio: true } },
      },
    });

    const periods: {
      efficiencyId: string;
      id: string;
      startHour: Date;
      endHour: Date;
      classification: PeriodClassification;
      description: string;
      type: PeriodType;
      repairClassification?: string;
      well: {
        id: string;
        name: string;
        contractId: string | null;
      } | null;
      //@ts-ignore
    }[] = efficiency.periods;
    //console.log(periods[1].startHour.toString());
    const formattedPeriods = periods.map((period) => {
      return {
        ...period,
        startHour: period.startHour.toISOString().split('T')[1].slice(0, 5),
        endHour: period.endHour.toISOString().split('T')[1].slice(0, 5),
      };
    });

    const introducao = [
      ['Relatório de Operações de Poços'],
      [
        'Este relatório apresenta as informações relacionadas às operações de poços, incluindo horários de início e fim, tipos de atividades, classificações de reparos e nomes dos poços.',
      ],
      ['Gerado em: ', new Date().toLocaleDateString()],
      [],
    ];

    // Cabeçalhos
    const headers = [
      'Hora de Início',
      'Hora de Fim',
      'Tipo',
      'Classificação',
      'Descrição',
      'Classificação do Reparo',
      'Nome do Poço',
    ];

    const rows = formattedPeriods.map((period) => [
      period.startHour,
      period.endHour,
      translateType(period.type),
      translateClassification(period.classification),
      period.description,
      translateRepairClassification(
        period.repairClassification as RepairClassification,
      ),
      period.well.name,
    ]);
    // Concatenação da Introdução, Resumo e Dados
    const dadosCompletos = [...introducao, headers, ...rows];

    // Criação da Planilha
    const ws = XLSX.utils.aoa_to_sheet(dadosCompletos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

    // Formatação Condicional (Exemplo básico de destaque de cabeçalhos)
    ws['A5'].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: '#FFFF00' } },
    }; // Exemplo de destaque no cabeçalho

    // Escreva o arquivo para o buffer
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Envie o arquivo para o cliente
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio.xlsx',
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    if (!efficiency) {
      throw new NotFoundException('Efficiencia não encontrada!');
    }

    response.send(buffer);
  }

  async findById(efficiencyId: string) {
    const efficiency = await this.efficiencyRepo.findUnique({
      where: {
        id: efficiencyId,
      },
      select: {
        id: true,
        date: true,
        availableHours: true,
        rigId: true,
        userId: true,
        christmasTreeDisassemblyHours: true,
        bobRentHours: true,
        hasDemobilization: true,
        hasExtraTrailer: true,
        hasGeneratorFuel: true,
        hasMixTankDemobilization: true,
        hasMixTankDtm: true,
        hasMixTankHourRent: true,
        hasMixTankMobilization: true,
        hasMixTankMonthRent: true,
        hasMixTankOperator: true,
        hasMunck: true,
        hasPowerSwivel: true,
        hasSuckingTruck: true,
        hasTransportation: true,
        hasTruckCartRent: true,
        truckKmHours: true,
        well: true,
        hasTruckTank: true,
        repairHours: true,
        isEditable: true,
        rig: true,
        standByHours: true,
        user: {
          select: {
            name: true,
          },
        },
        periods: {
          select: {
            efficiencyId: true,
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            description: true,
            type: true,
            repairClassification: true,
            well: true,
          },
          orderBy: { startHour: 'asc' },
        },
        equipmentRatio: { select: { ratio: true } },
        fluidRatio: { select: { ratio: true } },
        Billing: {
          select: {
            availableHourAmount: true,
            mobilizationAmount: true,
            demobilizationAmount: true,
            extraTrailerAmount: true,
            powerSwivelAmount: true,
            truckCartRentAmount: true,
            transportationAmount: true,
            bobRentAmount: true,
            mixTankMonthRentAmount: true,
            mixTankHourRentAmount: true,
            mixTankOperatorAmount: true,
            mixTankDemobilizationAmount: true,
            mixTankDtmAmount: true,
            mixTankMobilizationAmount: true,
            christmasTreeDisassemblyAmount: true,
          },
        },
      },
    });

    if (!efficiency) {
      throw new NotFoundException('Efficiencia não encontrada!');
    }

    return efficiency;
  }

  async remove(efficiencyId: string) {
    const pedingRequest = await this.deletionRequestRepo.findFisrt({
      where: { efficiencyId: efficiencyId, status: RequestStatus.PENDING },
    });

    if (pedingRequest) {
      await this.deletionRequestRepo.update({
        where: { id: pedingRequest.id },
        data: {
          reason: pedingRequest.reason,
          status: RequestStatus.FINISHED,
          efficiencyId: pedingRequest.efficiencyId,
        },
      });
    }

    await this.efficiencyRepo.delete({ where: { id: efficiencyId } });
    return null;
  }

  async getAverage(rigId: string) {
    //const rigId = '073168f7-b634-466d-aaee-a7968a39e2b1';
    //Mudar para params depois
    const year = new Date().getFullYear();

    return await this.efficiencyRepo.getAverage(rigId, year);
  }

  async getWellsCountByRig(rigId: string) {
    //Mudar para params depois
    const year = new Date().getFullYear();

    return await this.efficiencyRepo.getWellsCountByRig(rigId, year);
  }

  async getRigsAvailableHoursAverage(filters: {
    startDate: string;
    endDate: string;
  }) {
    const rigs = await this.rigsRepo.findAll();

    const average = await this.efficiencyRepo.groupBy({
      by: ['rigId'],
      _avg: {
        availableHours: true,
      },
      where: {
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      _count: true,
    });

    const result = average.map(({ _avg, rigId, _count }) => {
      const rigFound = rigs.find((rig) => rig.id === rigId);
      return {
        rigId,
        rig: rigFound.name,
        avg: _avg.availableHours,
        count: _count,
        state: rigFound.state,
      };
    });

    return result;
  }

  async update(updateEfficiencyDto: UpdateEfficiencyDto, efficiencyId: string) {
    return await this.efficiencyRepo.update({
      where: { id: efficiencyId },
      data: updateEfficiencyDto,
    });
  }
}
