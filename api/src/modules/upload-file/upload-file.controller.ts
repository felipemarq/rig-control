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
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

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

    await this.uploadFileService.uploadOccurenceFile(
      file,
      userId,
      occurrenceId,
    );
  }

  @Delete('/occurrence/:occurrenceId')
  async deleteOccurenceFile(
    @Param('occurrenceId', ParseUUIDPipe) occurrenceId: string,
  ) {
    await this.uploadFileService.deleteOccurenceFile(occurrenceId);
  }
}
