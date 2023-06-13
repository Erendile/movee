import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Entry } from 'src/entry/entities/entry.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(private readonly voteRepository: VoteRepository) {}

  async vote(
    entry: Entry,
    createVoteDto: CreateVoteDto,
    createdBy: User,
  ): Promise<void> {
    const vote = new Vote();
    vote.entry = entry;
    vote.createdBy = createdBy;
    vote.vote = createVoteDto.vote;

    try {
      await vote.save();
    } catch (error) {
      if (error.code === '23505') {
        const toUpdate = await this.getByEntryAndCreated(
          entry.id,
          createdBy.id,
        );
        toUpdate.vote = createVoteDto.vote;
        await toUpdate.save();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async getByEntryAndCreated(
    entryId: string,
    createdById: string,
  ): Promise<Vote> {
    return await this.voteRepository.findOneBy({ entryId, createdById });
  }
}
