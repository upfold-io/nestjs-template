import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateIdentityDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
