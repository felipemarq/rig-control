import { Injectable } from '@nestjs/common';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';
import { ChecklistItemRepository } from 'src/shared/database/repositories/checklistItem.repositories';

@Injectable()
export class ChecklistItemsService {
  constructor(private readonly checklistItemsRepo: ChecklistItemRepository) {}

  async create(createChecklistItemDto: CreateChecklistItemDto) {
    await this.checklistItemsRepo.create({
      data: createChecklistItemDto,
    });
  }

  async findAll() {
    return await this.checklistItemsRepo.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} checklistItem`;
  }

  update(id: number, updateChecklistItemDto: UpdateChecklistItemDto) {
    return `This action updates a #${id} checklistItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklistItem`;
  }
}
