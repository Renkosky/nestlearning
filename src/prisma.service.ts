// PrismaService，负责实例化 PrismaClient 并连接到您的数据库。
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //OnModuleInit 接口的实现。NestJS 生命周期钩子之一是 onModuleInit() 方法，该方法在模块初始化时被调用。
  //在这里，onModuleInit() 方法被重写为异步函数，并且在模块初始化时会调用 this.$connect() 方法。
  //$connect() 是 PrismaClient 的一个方法，用于连接到数据库。
  async onModuleInit() {
    await this.$connect();
  }
  // enableShutdownHooks() 方法，该方法在应用程序关闭时关闭 PrismaClient 连接。
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
