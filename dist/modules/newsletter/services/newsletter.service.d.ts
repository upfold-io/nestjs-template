import { PrismaService } from '@/shared/prisma/prisma.service';
import { SubscribeDto, UnsubscribeDto } from '../dtos';
import { ISubscriber } from '../types';
export declare class NewsletterService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    subscribe(subscribeDto: SubscribeDto): Promise<ISubscriber>;
    unsubscribe(unsubscribeDto: UnsubscribeDto): Promise<ISubscriber>;
}
