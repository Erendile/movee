import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const GetUser = createParamDecorator((_data, ctx): User => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
