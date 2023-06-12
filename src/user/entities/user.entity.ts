import { AppBaseEntity } from 'src/shared/appBaseEntity';
import { Column, Unique } from 'typeorm';

@Unique(['username', 'email'])
export class User extends AppBaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
