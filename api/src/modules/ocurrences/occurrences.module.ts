import { Module } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesController } from './occurrences.controller';
import { FileService } from '../file/file.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { PermissionsService } from '../permissions/permissions.service';

@Module({
  controllers: [OccurrencesController],
  providers: [
    OccurrencesService,
    FileService,
    MailService,
    UsersService,
    PermissionsService,
  ],
})
export class OccurrencesModule {}
