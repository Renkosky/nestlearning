import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find')
  async findUser(@Query() query: any) {
    if (isNaN(query?.id)) {
      throw new BadRequestException('ID must be a number');
    }
    const user = await this.userService.user({ id: Number(query?.id) });
    console.log(user);
    return user;
  }
}
