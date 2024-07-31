import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
  exports: [UploadFileService],
})
export class UploadFileModule {}
