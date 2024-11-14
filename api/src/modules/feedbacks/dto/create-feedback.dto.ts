import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FeedbackType } from '../entities/FeedbackType';
import { FeedbackStatus } from '../entities/FeedbackStatus';

export class CreateFeedbackDto {
  @IsEnum(FeedbackType)
  @IsNotEmpty()
  type: FeedbackType;

  @IsEnum(FeedbackStatus)
  @IsOptional()
  status: FeedbackStatus;

  @IsNotEmpty()
  @IsString()
  description: string;
}
