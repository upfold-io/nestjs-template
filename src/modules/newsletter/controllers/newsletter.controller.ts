import { Body, Controller, Delete, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubscribeDto, UnsubscribeDto } from '../dtos';
import { NewsletterService } from '../services';
import { ISubscriber } from '../types';

/**
 * This controller manages the endpoints for the newsletter subscription API.
 * It includes endpoints for subscribe and unsubscribe from  =b
 */
@ApiTags('newsletter')
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

  @Delete('unsubscribe')
  async unsubscribe(@Body() unsubscribeDto: UnsubscribeDto): Promise<ISubscriber> {
    try {
      return await this.newsletterService.unsubscribe(unsubscribeDto);
    } catch (error) {
      throw new HttpException('Email not subscribed', HttpStatus.BAD_REQUEST);
    }
  }
}
