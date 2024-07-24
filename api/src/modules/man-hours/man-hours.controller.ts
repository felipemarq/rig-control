import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ManHoursService } from './man-hours.service';
import { CreateManHourDto } from './dto/create-man-hour.dto';
import { UpdateManHourDto } from './dto/update-man-hour.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('man-hours')
export class ManHoursController {
  constructor(private readonly manHoursService: ManHoursService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createManHourDto: CreateManHourDto,
  ) {
    return this.manHoursService.create(userId, createManHourDto);
  }

  @Get('base/:baseId')
  findAllByBaseId(@Param('baseId') baseId: string) {
    return this.manHoursService.findAllByBaseId(baseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manHoursService.findOne(+id);
  }

  @Put(':manHourId')
  update(
    @ActiveUserId() userId: string,
    @Param('manHourId') manHourId: string,
    @Body() updateManHourDto: UpdateManHourDto,
  ) {
    return this.manHoursService.update(userId, manHourId, updateManHourDto);
  }

  @Get()
  findAll() {
    return this.manHoursService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manHoursService.remove(+id);
  }
}
