import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryRepository } from './entry.repository';
import { Entry } from './entities/entry.entity';
import { VoteModule } from 'src/vote/vote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), VoteModule],
  controllers: [EntryController],
  providers: [EntryService, EntryRepository],
  exports: [EntryService],
})
export class EntryModule {}
