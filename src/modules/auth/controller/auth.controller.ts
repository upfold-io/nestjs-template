import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthDTO } from '@modules/auth/dto';
import { AuthService } from '@modules/auth/service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: AuthDTO) {
    return await this.authService.login(authDto);
  }

  @Post('/logout')
  async logout() {
    return await this.authService.logout();
  }

  @Post('/refresh')
  async refreshTokens() {}
}
