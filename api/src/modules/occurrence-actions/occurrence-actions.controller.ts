import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { OccurrenceActionsService } from './occurrence-actions.service';
import { CreateOccurrenceActionDto } from './dto/create-occurrence-action.dto';
import { UpdateOccurrenceActionDto } from './dto/update-occurrence-action.dto';

@Controller('occurrence-actions')
export class OccurrenceActionsController {
  constructor(
    private readonly occurrenceActionsService: OccurrenceActionsService,
  ) {}

  @Post()
  create(@Body() createOccurrenceActionDto: CreateOccurrenceActionDto) {
    return this.occurrenceActionsService.create(createOccurrenceActionDto);
  }

  @Get()
  findAll() {
    return this.occurrenceActionsService.findAll();
  }

  @Get(':occurrenceActionId')
  findOne(@Param('occurrenceActionId') occurrenceActionId: string) {
    return this.occurrenceActionsService.findOne(occurrenceActionId);
  }

  @Put(':occurrenceActionId')
  update(
    @Param('occurrenceActionId') occurrenceActionId: string,
    @Body() updateOccurrenceActionDto: UpdateOccurrenceActionDto,
  ) {
    return this.occurrenceActionsService.update(
      occurrenceActionId,
      updateOccurrenceActionDto,
    );
  }

  @Delete(':occurrenceActionId')
  remove(@Param('occurrenceActionId') occurrenceActionId: string) {
    return this.occurrenceActionsService.remove(occurrenceActionId);
  }
}
