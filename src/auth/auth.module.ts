import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  providers: [AuthService, UserService, PrismaService, JwtStrategy],
})
export class AuthModule {}
