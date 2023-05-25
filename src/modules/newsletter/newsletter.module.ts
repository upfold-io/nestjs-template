import { Module } from '@nestjs/common';

import { PrismaModule } from '@/shared/prisma/prisma.module';

import { NewsletterService } from './services';

@Module({
  controllers: [],
  imports: [PrismaModule],
  providers: [NewsletterService],
})
export class NewsletterModule {}
