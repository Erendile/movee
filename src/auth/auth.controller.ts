import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/password')
  @UseGuards(JwtGuard)
  async updatePassword(
    @GetUser() user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    await this.authService.updatePassword(user, updatePasswordDto);
  }
}
