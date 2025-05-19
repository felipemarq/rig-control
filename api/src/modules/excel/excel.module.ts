import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { EfficienciesService } from '../efficiencies/efficiencies.service';
import { UserLogService } from '../user-log/user-log.service';
import { MailService } from '../mail/mail.service';
import { PeriodsService } from '../periods/periods.service';

@Module({
  controllers: [ExcelController],
  providers: [
    ExcelService,
    EfficienciesService,
    UserLogService,
    MailService,
    PeriodsService,
  ],
})
export class ExcelModule {}
