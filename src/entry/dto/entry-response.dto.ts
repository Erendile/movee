import { Vote } from 'src/vote/entities/vote.entity';
import { Entry } from '../entities/entry.entity';

export class EntryResponseDto {
  id: string;

  createdOn: Date;

  updatedOn: Date;

  subject: string;

  content: string;

  createdById: string;

  votes: Vote[];

  voteAverage: number;

  entryMapper(entry: Entry): void {
    this.id = entry.id;
    this.createdOn = entry.createdOn;
    this.updatedOn = entry.updatedOn;
    this.subject = entry.subject;
    this.content = entry.content;
    this.createdById = entry.createdById;
    this.votes = entry.votes;

    const total = this.votes.reduce((partialSum, a) => partialSum + a.vote, 0);
    this.voteAverage = total / this.votes.length;
  }
}
