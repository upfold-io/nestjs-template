import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateIdentityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  verified: boolean;
}
