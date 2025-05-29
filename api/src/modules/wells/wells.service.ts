import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';

@Injectable()
export class WellsService {
  constructor(
    private readonly wellsRepo: WellsRepository,
    private readonly periodsRepo: PeriodsRepository,
  ) {}

  create(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  createMany(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  async findAll() {
    const wrongWells = await this.wellsRepo.findAll({
      where: {
        AND: [
          {
            periods: {
              none: {},
            },
            contractId: null,

            checklists: {
              none: {},
            },
          },
        ],
      },
      include: {
        checklists: true,
        periods: true,
      },
    });

    //  console.log('Poços errados: ', wrongWells);

    const wells = await this.wellsRepo.findAll({
      where: {
        AND: [
          {
            contractId: null,
            name: { contains: 'SMC-0043', mode: 'insensitive' },
          },
        ],
      },
      include: {
        checklists: true,
        // periods: true,
      },
    });

    //  console.log('Existem ' + wells.length + ' poços com espaços no nome');
    for (const well of wrongWells) {
      console.log(`Removendo poço: ${well.name}`);
      await this.wellsRepo.delete({
        where: { id: well.id },
      });
    }

    console.log('Existem ' + wrongWells.length + ' poços sem periodos');

    /*  await this.updatePeriodsToCorrectWell(
      'e6dd6bb4-9ff6-4a97-9b6d-71482c229ccd', // ID correto
      ['d97cd06e-faf5-4bed-af46-21404f3704ea'],
    ); */

    return wells;
  }

  async updatePeriodsToCorrectWell(
    wellIdCorreto: string,
    wellIdsErrados: string[],
  ) {
    for (const wrongId of wellIdsErrados) {
      await this.periodsRepo.updateMany({
        where: { wellId: wrongId },
        data: { wellId: wellIdCorreto },
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} well`;
  }

  update(id: number, updateWellDto: UpdateWellDto) {
    return `This action updates a #${id} well`;
  }

  remove(id: number) {
    return `This action removes a #${id} well`;
  }

  async uploadSheet() {
    let workbook = xlsx.readFile('./src/modules/wells/temp/carmo.xlsx');

    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    let sheetWells = [];

    for (let index = 2; index < 2216; index++) {
      sheetWells.push(worksheet['E' + index].v);
    }

    const wells = await this.wellsRepo.findAll({ select: { name: true } });

    const existingWells = [];

    wells.forEach((well) => {
      const wellFound = sheetWells.find((sheetWell) => {
        return sheetWell === well.name;
      });

      if (wellFound) {
        existingWells.push(wellFound);
      }
    });

    const distinctsWells = sheetWells.filter(
      (item) => !existingWells.includes(item),
    );

    return 'ok por enquanto';
  }
}
