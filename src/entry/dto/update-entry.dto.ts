import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEntryDto {
  @IsNotEmpty()
  @IsOptional()
  subject: string;

  @IsNotEmpty()
  @IsOptional()
  content: string;
}
