import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntryRepository extends Repository<Entry> {
  constructor(private readonly dataSource: DataSource) {
    super(Entry, dataSource.createEntityManager());
  }
}
