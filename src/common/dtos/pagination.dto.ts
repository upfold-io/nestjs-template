import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsPositive()
  @IsOptional()
  @IsNumber()
  page: number;
}
