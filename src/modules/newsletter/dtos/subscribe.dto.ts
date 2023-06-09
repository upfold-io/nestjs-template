import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
}
