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
  ],
})
export class DatabaseModule {}
