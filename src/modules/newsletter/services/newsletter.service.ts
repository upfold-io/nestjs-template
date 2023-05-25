import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma/prisma.service';

import { SubscribeDto, UnsubscribeDto } from '../dtos';
import { ISubscriber } from '../types';

@Injectable()
export class NewsletterService {
  constructor(private readonly prismaService: PrismaService) {}

  async subscribe(subscribeDto: SubscribeDto): Promise<ISubscriber> {
    return this.prismaService.subscriber.create({
      data: { ...subscribeDto },
    });
  }

  async unsubscribe(unsubscribeDto: UnsubscribeDto): Promise<ISubscriber> {
    return this.prismaService.subscriber.delete({
      where: { ...unsubscribeDto },
    });
  }
}
