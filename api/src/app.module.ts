import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RigsModule } from './modules/rigs/rigs.module';
import { EfficienciesModule } from './modules/efficiencies/efficiencies.module';
import { BillingsModule } from './modules/billings/billings.module';
import { BillingsConfigurationModule } from './modules/billings-configuration/billings-configuration.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { UsersRigModule } from './modules/users-rig/users-rig.module';
import { DeletionRequestsModule } from './modules/deletion-requests/deletion-requests.module';
import { WellsModule } from './modules/wells/wells.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { TemporaryEfficienciesModule } from './modules/temporary-efficiencies/temporary-efficiencies.module';
import { UserLogModule } from './modules/user-log/user-log.module';
import { SystemVersionModule } from './modules/system-version/system-version.module';
import { OccurrencesModule } from './modules/ocurrences/occurrences.module';
import { BasesModule } from './modules/bases/bases.module';
import { ManHoursModule } from './modules/man-hours/man-hours.module';
import { FileModule } from './modules/file/file.module';
import { ConfigModule } from '@nestjs/config';
import { OccurrenceActionsModule } from './modules/occurrence-actions/occurrence-actions.module';
import { ClientsModule } from './modules/clients/clients.module';
import { MailModule } from './modules/mail/mail.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    RigsModule,
    EfficienciesModule,
    TemporaryEfficienciesModule,
    BillingsModule,
    BillingsConfigurationModule,
    ContractsModule,
    UsersRigModule,
    DeletionRequestsModule,
    WellsModule,
    PeriodsModule,
    UserLogModule,
    SystemVersionModule,
    OccurrencesModule,
    BasesModule,
    ManHoursModule,
    FileModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OccurrenceActionsModule,
    ClientsModule,
    MailModule,
    NotificationsModule,
    FeedbacksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
