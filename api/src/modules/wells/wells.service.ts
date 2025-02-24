import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';

@Injectable()
export class WellsService {
  constructor(private readonly wellsRepo: WellsRepository) {}

  create(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  createMany(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  findAll() {
    return `This action returns all wells`;
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
