import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/shared/prisma/prisma.module';

import { IdentityModule } from './identity/identity.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
    AuthModule,
    IdentityModule,
    PrismaModule,
    ProductModule,
  ],
})
export class AppModule {}
