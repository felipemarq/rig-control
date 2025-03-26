import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from 'src/shared/database/repositories/permission.repositories';
import { Module } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepo: PermissionRepository) {}

  async upsert(createPermissionDto: CreatePermissionDto) {
    const { permissions } = createPermissionDto;

    for (const permission of permissions) {
      await this.permissionsRepo.upsert({
        where: {
          userId_module: {
            userId: permission.userId,
            module: permission.module as Module,
          },
        },
        update: {
          canCreate: permission.canCreate,
          canEdit: permission.canEdit,
          canView: permission.canView,
        },
        create: {
          userId: permission.userId,
          module: permission.module as Module,
          canCreate: permission.canCreate,
          canEdit: permission.canEdit,
          canView: permission.canView,
        },
      });
    }

    return { message: 'Permissões atualizadas com sucesso' };
  }

  async getUserPermissions(userId: string) {
    const permissions = await this.permissionsRepo.findMany({
      where: { userId },
    });

    return permissions;
  }

  async getUserPermissionsByModule(userId: string, module: Module) {
    const permissions = await this.permissionsRepo.findMany({
      where: { userId, module },
    });

    return permissions;
  }
}
