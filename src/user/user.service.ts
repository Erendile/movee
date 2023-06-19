import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/signin.dto';
import * as argon2 from 'argon2';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { UpdatePasswordDto } from 'src/auth/dto/update-password.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.userRepository.signUp(signUpDto);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async validateUserPassword(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await this.validatePassword(user, password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async updatePassword(
    user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = updatePasswordDto;

    if (!(await this.validatePassword(user, currentPassword))) {
      throw new UnauthorizedException('Password is wrong');
    }

    user.password = await argon2.hash(newPassword);
    await user.save();
  }

  private async validatePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    return await user.validatePassword(password);
  }
}
