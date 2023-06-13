import { Injectable } from '@nestjs/common';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(private readonly voteRepository: VoteRepository) {}
}
