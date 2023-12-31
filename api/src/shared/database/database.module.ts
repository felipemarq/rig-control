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
  ],
})
export class DatabaseModule {}
