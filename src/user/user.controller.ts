import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EntryQuery } from 'src/entry/dto/entry-query.dto';
import { Entry } from 'src/entry/entities/entry.entity';
import { EntryService } from 'src/entry/entry.service';
import { PaginationDto } from 'src/shared/pagination/pagination.dto';
import { PaginationQuery } from 'src/shared/pagination/pagination.query';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly entryService: EntryService) {}

  @Get('/entries')
  @UseGuards(JwtGuard)
  async getAllEntries(
    @Query() entryQuery: EntryQuery,
    @Query() paginationQuery: PaginationQuery,
    @GetUser() createdBy: User,
  ): Promise<PaginationDto<Entry>> {
    entryQuery.createdById = createdBy.id;
    return await this.entryService.getAll(entryQuery, paginationQuery);
  }
}
