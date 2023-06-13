import { Entry } from 'src/entry/entities/entry.entity';
import { AppBaseEntity } from 'src/shared/appBaseEntity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Vote extends AppBaseEntity {
  @Column()
  entryId: string;

  @ManyToOne(() => Entry, (entry) => entry.votes, { eager: false })
  entry: Entry;

  @Column()
  createdById: string;

  @ManyToOne(() => User, (user) => user.votes, { eager: false })
  createdBy: User;

  @Column()
  vote: number;
}
