import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { DataSource, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password, email } = signUpDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await argon2.hash(password);

    try {
      await user.save();
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
