import { AppBaseEntity } from 'src/shared/appBaseEntity';
import { Column, Entity, Unique } from 'typeorm';

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
}
