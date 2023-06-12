import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.userRepository.signUp(signUpDto);
  }
}
