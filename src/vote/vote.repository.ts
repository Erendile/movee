import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteRepository extends Repository<Vote> {
  constructor(private readonly dataSource: DataSource) {
    super(Vote, dataSource.createEntityManager());
  }
}
