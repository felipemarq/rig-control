import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackRepository } from 'src/shared/database/repositories/feedback.repositories';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbacksRepo: FeedbackRepository) {}

  async create(userId: string, createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbacksRepo.create({
      data: { ...createFeedbackDto, userId },
    });
  }

  async findAll() {
    return await this.feedbacksRepo.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
