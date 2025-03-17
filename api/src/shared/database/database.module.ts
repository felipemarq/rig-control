import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { UsersRigRepository } from './repositories/usersRig.repositories';
import { RigsRepository } from './repositories/rigs.repositories';
import { EfficienciesRepository } from './repositories/efficiencies.repositories';
import { BillingConfigurationsRepository } from './repositories/billingConfiguration.repositories';
import { BillingRepository } from './repositories/billing.repositories';
import { ContractRepository } from './repositories/contract.repositories';
import { UsersContractRepository } from './repositories/usersContract.repositories';
import { PrismaClient } from '@prisma/client';
import { DeletionRequestRepository } from './repositories/deletionRequests.repositories';
import { WellsRepository } from './repositories/well.repositories';
import { PeriodsRepository } from './repositories/period.repositories';
import { TemporaryEfficienciesRepository } from './repositories/temporaryEfficienciesRepositories';
import { UserLogsRepository } from './repositories/userLog.repositories';
import { SystemVersionRepository } from './repositories/systemVersion.repositories';
import { OccurrenceRepository } from './repositories/occurrences.repositories';
import { BaseRepository } from './repositories/base.repositories';
import { ManHourRepository } from './repositories/manHour.repositories';
import { FilesRepository } from './repositories/files.repositories';
import { OccurrenceActionsRepository } from './repositories/occurrence-actions.repositories';
import { ClientRepository } from './repositories/client.repositories';
import { NotificationsRepository } from './repositories/notifications.repositories';
import { UsersNotificationsRepository } from './repositories/usersNotification.repositories';
import { FeedbackRepository } from './repositories/feedback.repositories';
import { PeriodActionPlansRepository } from './repositories/periodActionPlans.repositories';
import { PeriodActionPlanItemsRepository } from './repositories/periodActionPlanItems.repositories';
import { ChecklistRepository } from './repositories/checklist.repositories';
import { ChecklistItemRepository } from './repositories/checklistItem.repositories';
import { EvaluationRepository } from './repositories/evaluation.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    UsersRigRepository,
    RigsRepository,
    EfficienciesRepository,
    BillingConfigurationsRepository,
    BillingRepository,
    ContractRepository,
    UsersContractRepository,
    PrismaClient,
    DeletionRequestRepository,
    WellsRepository,
    PeriodsRepository,
    TemporaryEfficienciesRepository,
    UserLogsRepository,
    SystemVersionRepository,
    OccurrenceRepository,
    BaseRepository,
    ManHourRepository,
    FilesRepository,
    OccurrenceActionsRepository,
    ClientRepository,
    NotificationsRepository,
    UsersNotificationsRepository,
    FeedbackRepository,
    PeriodActionPlansRepository,
    PeriodActionPlanItemsRepository,
    ChecklistRepository,
    ChecklistItemRepository,
    EvaluationRepository,
  ],
  exports: [
    PrismaService,
    UsersRepository,
    UsersRigRepository,
    RigsRepository,
    EfficienciesRepository,
    BillingConfigurationsRepository,
    BillingRepository,
    ContractRepository,
    UsersContractRepository,
    DeletionRequestRepository,
    WellsRepository,
    PeriodsRepository,
    TemporaryEfficienciesRepository,
    UserLogsRepository,
    SystemVersionRepository,
    OccurrenceRepository,
    BaseRepository,
    FilesRepository,
    ManHourRepository,
    OccurrenceActionsRepository,
    ClientRepository,
    NotificationsRepository,
    UsersNotificationsRepository,
    FeedbackRepository,
    PeriodActionPlansRepository,
    PeriodActionPlanItemsRepository,
    ChecklistRepository,
    ChecklistItemRepository,
    EvaluationRepository,
  ],
})
export class DatabaseModule {}
