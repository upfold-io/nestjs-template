import { SubscribeDto } from '../dtos';
import { NewsletterService } from '../services';
import { ISubscriber } from '../types';
export declare class NewsletterControler {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    subscribe(subscribeDto: SubscribeDto): Promise<ISubscriber>;
}
