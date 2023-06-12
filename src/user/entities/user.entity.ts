import { AppBaseEntity } from 'src/shared/appBaseEntity';
import * as argon2 from 'argon2';
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

  async validatePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}
