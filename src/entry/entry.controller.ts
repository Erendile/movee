import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';
import { PaginationQuery } from 'src/shared/pagination/pagination.query';
import { User } from 'src/user/entities/user.entity';
import { CreateVoteDto } from 'src/vote/dto/create-vote.dto';
import { CreateEntryDto } from './dto/create-entry.dto';
import { EntryQuery } from './dto/entry-query.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';
import { EntryService } from './entry.service';

@Controller('entries')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  async getAll(
    @Query() entryQuery: EntryQuery,
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginationDto<Entry>> {
    return await this.entryService.getAll(entryQuery, paginationQuery);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createEntryDto: CreateEntryDto,
    @GetUser() createdBy: User,
  ): Promise<Entry> {
    return await this.entryService.create(createEntryDto, createdBy);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(
    @Param('id') id: string,
    @GetUser() createdBy: User,
  ): Promise<void> {
    await this.entryService.delete(id, createdBy);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
    @GetUser() createdBy: User,
  ): Promise<Entry> {
    return await this.entryService.update(id, updateEntryDto, createdBy);
  }

  @Post('/:id/vote')
  @UseGuards(JwtGuard)
  async vote(
    @Param('id') id: string,
    @Body() createVoteDto: CreateVoteDto,
    @GetUser() createdBy: User,
  ) {
    return await this.entryService.vote(id, createVoteDto, createdBy);
  }
}
