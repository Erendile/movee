import { Injectable } from '@nestjs/common';
import { EntryRepository } from './entry.repository';

@Injectable()
export class EntryService {
  constructor(private readonly entryRepository: EntryRepository) {}
}
