import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.userRepository.signUp(signUpDto);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async validateUserPassword(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.findByEmail(email);

    if (await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}
