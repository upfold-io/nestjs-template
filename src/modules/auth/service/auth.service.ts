import argon2 from 'argon2';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IIdentity } from '@common/interfaces';

import { AuthDTO } from '@modules/auth/dto';
import { IdentityService } from '@modules/identity/service';

import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private identityService: IdentityService,
  ) {}

  async login(body: AuthDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const identity = await this.identityService.findOneByCondition({
      email_address: body.email_address,
    });

    if (!identity) {
      throw new BadRequestException('invalid_credentials');
    }

    const { accessToken, refreshToken } = await this.getTokens(identity.id, identity.email_address);

    this.logger.log(`User ${identity.id} logged in`);

    return { accessToken, refreshToken };
  }

  async logout() {}

  async updateRefreshToken(identityId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.identityService.update(identityId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async getTokens(identityId: string, emailAddress: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: identityId, emailAddress },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        { sub: identityId, emailAddress },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
