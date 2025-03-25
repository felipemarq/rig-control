import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createChecklistDto: CreateChecklistDto,
  ) {
    return this.checklistsService.create(createChecklistDto, userId);
  }

  @Get()
  findAll() {
    return this.checklistsService.findAll();
  }

  @Get('average-scores-by-category')
  async getAverageScoresByCategory() {
    return this.checklistsService.getEvaluationAverageByCategory();
  }

  @Get(':checklistId')
  findOne(@Param('checklistId') checklistId: string) {
    return this.checklistsService.findOne(checklistId);
  }

  @Delete(':checklistId')
  remove(@Param('checklistId') checklistId: string) {
    return this.checklistsService.remove(checklistId);
  }

  @Patch(':checklistId')
  update(
    @ActiveUserId() userId: string,
    @Param('checklistId') checklistId: string,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ) {
    return this.checklistsService.update(
      checklistId,
      updateChecklistDto,
      userId,
    );
  }

  //Criar um endpoint de update
}
