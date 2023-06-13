import { IsNumber, Max, Min } from 'class-validator';

export class CreateVoteDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  vote: number;
}
