import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
  MiddlewareConsumer,
  Res,
} from '@nestjs/common';
import { EfficienciesService } from './efficiencies.service';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { Response } from 'express';
import { DebugEndpoint } from 'src/shared/decorators/DebugEndpoint';
import { UserLogService } from '../user-log/user-log.service';
import { getCurrentISOString } from 'src/shared/utils/getCurrentISOString';
import { LogType } from '../user-log/entities/LogType';
import { DeleteBodyDto } from './dto/delete-body.dto';

@Controller('efficiencies')
export class EfficienciesController {
  constructor(
    private readonly efficienciesService: EfficienciesService,
    private readonly userLogService: UserLogService,
  ) {}

  @Get('/pending-efficiency-confirmation')
  async pendingConfirmation(@ActiveUserId() userId: string) {
    return await this.efficienciesService.pendingConfirmation(userId);
  }

  @Get('/average')
  getAverageEfficiency(
    @ActiveUserId() userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.efficienciesService.getRigsAvailableHoursAverage({
      startDate,
      endDate,
      userId,
    });
  }

  @Get('/well-count/:rigId')
  getWellsCountByRig(@Param('rigId') rigId: string) {
    return this.efficienciesService.getWellsCountByRig(rigId);
  }

  @Get('/excel/:efficiencyId')
  excelReport(
    @Res() response: Response,
    @Param('efficiencyId', ParseUUIDPipe) efficiencyId: string,
  ) {
    return this.efficienciesService.excelReport(efficiencyId, response);
  }

  @Get('/pdf/')
  pdfReport(
    @Res() response: Response,
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @ActiveUserId() userId: string,
  ) {
    return this.efficienciesService.pdfReport(
      response,
      {
        rigId,
        startDate,
        endDate,
      },
      userId,
    );
  }

  @Post('/delete')
  async delete(@Body() deleteBody: DeleteBodyDto) {
    return await this.efficienciesService.deleteWithBody(deleteBody);
  }

  @Get('/recalculate')
  async recalculate(
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.efficienciesService.recalculateEfficiency({
      rigId,
      startDate,
      endDate,
    });
  }

  @Post('/confirm/:efficiencyId')
  async confirmEfficiency(
    @Param('efficiencyId', ParseUUIDPipe) efficiencyId: string,
  ) {
    return await this.efficienciesService.calculateEfficiencyBilling(
      efficiencyId,
    );
  }

  // Rotas com parâmetros de caminho (mais específicas)
  @Get(':efficiencyId')
  findById(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.efficienciesService.findById(efficiencyId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':efficiencyId')
  remove(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.efficienciesService.remove(efficiencyId);
  }

  @Get('/average/:rigId')
  getAverage(@Param('rigId') rigId: string) {
    return this.efficienciesService.getAverage(rigId);
  }
  // Rotas com parâmetros de consulta (menos específicas)
  @Get()
  findAll(
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @ActiveUserId() userId: string,
  ) {
    return this.efficienciesService.findAllByRigId(
      {
        rigId,
        startDate,
        endDate,
      },
      userId,
    );
  }

  // Demais rotas
  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createEfficiencyDto: CreateEfficiencyDto,
  ) {
    return await this.efficienciesService.create(createEfficiencyDto, userId);
  }

  @Patch(':efficiencyId')
  update(
    @Param('efficiencyId') efficiencyId: string,
    @Body() updateEfficiencyDto: UpdateEfficiencyDto,
  ) {
    return this.efficienciesService.update(updateEfficiencyDto, efficiencyId);
  }
}
