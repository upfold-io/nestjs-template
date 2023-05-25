import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email_address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
