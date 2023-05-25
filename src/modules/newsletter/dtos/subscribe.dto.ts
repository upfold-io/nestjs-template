import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SubscribeDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
}
