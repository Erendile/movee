import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  pageSize?: number = 10;
}
