import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';
import { PaginationQuery } from 'src/shared/pagination/pagination.query';
import { User } from 'src/user/entities/user.entity';
import { CreateVoteDto } from 'src/vote/dto/create-vote.dto';
import { VoteService } from 'src/vote/vote.service';
import { ILike } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { EntryQuery } from './dto/entry-query.dto';
import { EntryResponseDto } from './dto/entry-response.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';
import { EntryRepository } from './entry.repository';

@Injectable()
export class EntryService {
  constructor(
    private readonly entryRepository: EntryRepository,
    private readonly voteService: VoteService,
  ) {}

  async getAll(
    entryQuery: EntryQuery,
    paginationQuery: PaginationQuery,
  ): Promise<PaginationDto<EntryResponseDto>> {
    const { page, pageSize } = paginationQuery;
    const skip = (page - 1) * pageSize;

    const [items, count] = await this.entryRepository.findAndCount({
      where: [
        {
          subject: ILike(`%${entryQuery.search || ''}%`),
          createdById: entryQuery.createdById || null,
        },
      ],
      order: {
        subject: 'ASC',
      },
      take: pageSize,
      skip,
    });

    const pageCount = Math.ceil(count / pageSize);

    const entries = items.map((item) => {
      const entryResponse = new EntryResponseDto();
      entryResponse.entryMapper(item);
      return entryResponse;
    });

    return {
      items: entries,
      total: count,
      page,
      pageSize,
      pageCount,
      hasNextPage: page !== pageCount,
      hasPreviousPage: page !== 1,
    };
  }

  async getEntriesByVote(
    entryQuery: EntryQuery,
    paginationQuery: PaginationQuery,
    includeVoted: boolean,
  ): Promise<PaginationDto<EntryResponseDto>> {
    const { page, pageSize } = paginationQuery;
    const skip = (page - 1) * pageSize;

    const voteSubQuery = this.voteService.getVoteSubQuery();

    const entryQueryBuilder = this.entryRepository.createQueryBuilder('entry');
    entryQueryBuilder
      .leftJoinAndSelect('entry.votes', 'vote')
      .where('entry.createdById = :createdById', {
        createdById: entryQuery.createdById || null,
      })
      .andWhere(`entry.id ${includeVoted ? 'IN' : 'NOT IN'} (${voteSubQuery})`)
      .orderBy('entry.subject', 'ASC')
      .take(pageSize)
      .skip(skip);

    if (entryQuery.search) {
      entryQueryBuilder.andWhere('entry.subject ILIKE :search', {
        search: `%${entryQuery.search}%`,
      });
    }

    const [items, count] = await entryQueryBuilder.getManyAndCount();

    const entries = items.map((item) => {
      const entryResponse = new EntryResponseDto();
      entryResponse.entryMapper(item);
      return entryResponse;
    });

    const pageCount = Math.ceil(count / pageSize);

    return {
      items: entries,
      total: count,
      page,
      pageSize,
      pageCount,
      hasNextPage: page < pageCount,
      hasPreviousPage: page > 1,
    };
  }

  async create(
    createEntryDto: CreateEntryDto,
    createdBy: User,
  ): Promise<Entry> {
    const entry = new Entry();
    const { content, subject } = createEntryDto;

    entry.content = content;
    entry.subject = subject;
    entry.createdBy = createdBy;

    await entry.save();
    delete entry.createdBy;

    return entry;
  }

  async getById(id: string): Promise<Entry> {
    const entry = await this.entryRepository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry with ID: "${id}" not found`);
    }

    return entry;
  }

  async getByCreatedById(id: string, createdBy: User): Promise<Entry> {
    const entry = await this.entryRepository.findOneBy({
      id,
      createdById: createdBy.id,
    });

    if (!entry) {
      throw new NotFoundException(`Entry with ID: "${id}" not found`);
    }

    return entry;
  }

  async delete(id: string, createdBy: User): Promise<void> {
    const result = await this.entryRepository.delete({
      id,
      createdById: createdBy.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Entry with ID: "${id}" not found`);
    }
  }

  async update(
    id: string,
    updateEntryDto: UpdateEntryDto,
    createdBy: User,
  ): Promise<Entry> {
    const entry = await this.getByCreatedById(id, createdBy);
    const { subject, content } = updateEntryDto;

    if (subject) {
      entry.subject = subject;
    }

    if (content) {
      entry.content = content;
    }

    await entry.save();
    return entry;
  }

  async vote(
    id: string,
    createVoteDto: CreateVoteDto,
    createdBy: User,
  ): Promise<void> {
    const entry = await this.getById(id);
    await this.voteService.vote(entry, createVoteDto, createdBy);
  }
}
