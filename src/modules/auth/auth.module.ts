import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { IdentityModule } from '@modules/identity/identity.module';

import { LoggerModule } from '@/logger/logger.module';

import { AuthController } from './controller';
import { AuthService } from './service';

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
