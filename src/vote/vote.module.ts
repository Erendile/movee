import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteRepository } from './vote.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [VoteService, VoteRepository],
  exports: [VoteService],
})
export class VoteModule {}
