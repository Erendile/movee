import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.userService.signUp(signUpDto);
  }
}
