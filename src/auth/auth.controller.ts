import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '@/auth/auth.service';
import { AuthDTO, RegisterDTO } from '@/auth/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Req() req, @Res() res, @Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Req() req, @Res() res, @Body() body: AuthDTO) {
    return await this.authService.login(body);
  }

  @Post('/logout')
  logout() {}

  @Post('/refresh')
  refreshTokens() {}
}
