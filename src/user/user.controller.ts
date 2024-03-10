import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createHash } from 'crypto';
import { AuthService } from 'src/auth/auth.service';

function md5(str) {
  const hash = createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/find')
  async findUser(@Query() query: any) {
    if (isNaN(query?.id)) {
      throw new BadRequestException('ID must be a number');
    }
    const user = await this.userService.findOneUser({ id: Number(query?.id) });
    console.log(user);
    return user;
  }

  @Post('/register')
  async createUser(@Body() body: any) {
    const fondUser = await this.userService.findUserByNane(body?.name);
    if (fondUser) {
      throw new HttpException('用户已存在', 400);
    }
    const user = await this.userService.createUser({
      name: body?.name,
      email: body?.email,
      password: md5(body?.password),
    });

    console.log(user);
    return user;
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.userService.findUserByNane(body?.name);
    if (user && user.password === md5(body?.password)) {
      const token = await this.authService.login(body);
      return { code: 0, ...token };
    }
    throw new HttpException('用户名密码错误', 400);
  }
}
