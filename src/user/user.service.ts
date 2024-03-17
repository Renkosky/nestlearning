import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  // Prisma.UserWhereUniqueInput 由 Prisma 自动生成的输入类型，用于标识唯一用户的输入条件。在使用 Prisma 进行数据库操作时，这种类型通常用于在查询或定位特定用户时指定唯一的标识或条件。
  // https://prisma.nodejs.cn/reference/api-reference/prisma-client-reference#findunique
  async findOneUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  async findUserByNane(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async findUserProjects(params: { where: Prisma.UserWhereUniqueInput }) {
    return this.prisma.user.findUnique({
      where: params.where,
      include: {
        projects: true,
      },
    });
  }
}
