import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import argon2 from 'argon2';

import { AuthDTO, RegisterDTO } from '@/auth/dto';
import { IdentityService } from '@/identity/identity.service';
import { IIdentity } from '@/identity/interface';
import { LoggerService } from '@/shared/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private identityService: IdentityService,
  ) {}

  async login(body: AuthDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const identity = await this.identityService.findOneByCondition({
      email_address: body.email_address,
    });

    if (!identity) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: identity.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    this.logger.log(`User ${identity.id} logged in`);

    return { accessToken, refreshToken };
  }

  async register(body: RegisterDTO): Promise<IIdentity> {
    try {
      return await this.identityService.create(body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Credentials already exists');
      }

      throw error;
    }
  }

  async updateRefreshToken(identityId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.identityService.update(identityId, {
      refresh_token: hashedRefreshToken,
    });
  }
}
