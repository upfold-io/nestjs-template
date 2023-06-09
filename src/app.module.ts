import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { HttpExceptionFilter } from '@common/filters/http-exception.filter';

import { SharedModule } from '@shared/shared.module';

import { AuthModule } from '@modules/auth/auth.module';
import { IdentityModule } from '@modules/identity/identity.module';
import { NewsletterModule } from '@modules/newsletter/newsletter.module';
import { ProductModule } from '@modules/product/product.module';

import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    IdentityModule,
    PrismaModule,
    ProductModule,
    NewsletterModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
