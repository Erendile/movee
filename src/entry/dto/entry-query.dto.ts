import { IsOptional } from 'class-validator';

export class EntryQuery {
  @IsOptional()
  search?: string;

  @IsOptional()
  createdById?: string;
}
