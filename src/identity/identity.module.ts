import { Module } from '@nestjs/common';

import { PrismaModule } from '@/shared/prisma/prisma.module';

import { IdentityService } from './identity.service';

@Module({
  imports: [PrismaModule],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
