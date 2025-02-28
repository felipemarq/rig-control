import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/occurrence/:occurrenceId')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @ActiveUserId() userId: string,
    @Param('occurrenceId', ParseUUIDPipe) occurrenceId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo inválido!');
    }

    await this.fileService.uploadOccurenceFile(file, userId, occurrenceId);
  }

  @Post('/evaluation/:evaluationId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEvaluationFile(
    @ActiveUserId() userId: string,
    @Param('evaluationId', ParseUUIDPipe) evaluationId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo inválido!');
    }

    await this.fileService.uploadEvaluationFile(file, userId, evaluationId);
  }

  @Post('/occurrence-action/:occurrenceActionId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOccurrenceActionFile(
    @ActiveUserId() userId: string,
    @Param('occurrenceActionId', ParseUUIDPipe) occurrenceActionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo inválido!');
    }

    await this.fileService.uploadOccurenceActionFile(
      file,
      userId,
      occurrenceActionId,
    );
  }

  @Post('/periodActionPlan/:periodActionPlanId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPeriodActionPlanFile(
    @ActiveUserId() userId: string,
    @Param('periodActionPlanId', ParseUUIDPipe) periodActionPlanId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo inválido!');
    }

    await this.fileService.uploadPeriodActionPlanFile(
      file,
      userId,
      periodActionPlanId,
    );
  }

  @Delete('/periodActionPlan/:fileId')
  async deletePeriodActionPlanFile(@Param('fileId') fileId: string) {
    await this.fileService.deletePeriodActionPlanFile(fileId);
  }

  @Delete('/occurrence/:occurrenceId')
  async deleteOccurenceFile(
    @Param('occurrenceId', ParseUUIDPipe) occurrenceId: string,
  ) {
    await this.fileService.deleteOccurenceFile(occurrenceId);
  }

  @Delete('/occurrence-action/:occurrenceActionId')
  async deleteOccurenceActionFile(
    @Param('occurrenceActionId', ParseUUIDPipe) occurrenceActionId: string,
  ) {
    await this.fileService.deleteOccurenceActionFile(occurrenceActionId);
  }
}
