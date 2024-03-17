import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

type User = {
  id: number;
  name: string;
};
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findUserByNane(username);
    if (user && user.password === pass) {
      return { id: user.id, name: user.name };
    }
    return null;
  }
  async certificate(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
