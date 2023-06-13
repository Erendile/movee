import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  content: string;
}
