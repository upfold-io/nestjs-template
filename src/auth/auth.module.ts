import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { IdentityModule } from '@/identity/identity.module';
import { LoggerModule } from '@/shared/logger/logger.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    IdentityModule,
    LoggerModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    JwtModule.register({}),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
