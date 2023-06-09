import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '@modules/auth/service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrPrivateKey: configService.get('JWT_ACCESS_SECRET'),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return payload;
  }
}
