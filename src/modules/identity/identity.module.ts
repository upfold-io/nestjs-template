import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { IdentityController } from './controller';
import { IdentityService } from './service';

@Module({
  controllers: [IdentityController],
  imports: [PrismaModule],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
