import { AppBaseEntity } from 'src/shared/appBaseEntity';
import * as argon2 from 'argon2';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Entry } from 'src/entry/entities/entry.entity';
import { Vote } from 'src/vote/entities/vote.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends AppBaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Entry, (entry) => entry.createdBy, { eager: true })
  entries: Entry[];

  @OneToMany(() => Vote, (vote) => vote.createdBy, { eager: true })
  votes: Vote[];

  async validatePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}
