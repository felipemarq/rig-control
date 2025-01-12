import { Module } from '@nestjs/common';
import { EfficienciesService } from './efficiencies.service';
import { EfficienciesController } from './efficiencies.controller';
import { PrismaClient } from '@prisma/client';
import { UserLogService } from '../user-log/user-log.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [EfficienciesController],
  providers: [EfficienciesService, PrismaClient, UserLogService, MailService],
})
export class EfficienciesModule {}
