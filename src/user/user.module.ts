import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService, AuthService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
