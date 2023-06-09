import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { NewsletterControler } from './controllers';
import { NewsletterService } from './services';

@Module({
  controllers: [NewsletterControler],
  imports: [PrismaModule],
  providers: [NewsletterService],
})
export class NewsletterModule {}
