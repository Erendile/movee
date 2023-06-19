import { AppBaseEntity } from 'src/shared/appBaseEntity';
import { User } from 'src/user/entities/user.entity';
import { Vote } from 'src/vote/entities/vote.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Entry extends AppBaseEntity {
  @Column()
  subject: string;

  @Column()
  content: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User, (user) => user.entries, {
    eager: false,
    onDelete: 'CASCADE',
  })
  createdBy: User;

  @OneToMany(() => Vote, (vote) => vote.entry, { eager: true })
  votes: Vote[];
}
