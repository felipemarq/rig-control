import { Injectable } from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';

@Injectable()
export class BasesService {
  constructor(private readonly basesRepo: BaseRepository) {}
  findAll() {
    return this.basesRepo.findMany({});
  }

  create(createBaseDto: CreateBaseDto) {
    return this.basesRepo.create({data:createBaseDto})
  }
}
