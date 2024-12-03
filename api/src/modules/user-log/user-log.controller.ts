import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

//@IsPublic()
@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get()
  findAll(
    @Query('pageSize') pageSize: string,
    @Query('pageIndex') pageIndex: string,
  ) {
    return this.userLogService.findAll(pageSize, pageIndex);
  }

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createUserLogDto: CreateUserLogDto,
  ) {
    await this.userLogService.create(createUserLogDto.loginTime, userId);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.userLogService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLogDto: UpdateUserLogDto) {
    return this.userLogService.update(+id, updateUserLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogService.remove(+id);
  }
}
