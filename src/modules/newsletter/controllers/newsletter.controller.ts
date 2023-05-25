import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { SubscribeDto } from '../dtos';
import { NewsletterService } from '../services';
import { ISubscriber } from '../types';

/**
 * This controller manages the endpoints for the newsletter subscription API.
 */
@Controller('newsletter')
export class NewsletterControler {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeDto: SubscribeDto): Promise<ISubscriber> {
    try {
      return await this.newsletterService.subscribe(subscribeDto);
    } catch (error) {
      throw new HttpException('Email already subscribed', HttpStatus.BAD_REQUEST);
    }
  }
}
