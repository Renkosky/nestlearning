import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnvironmentUrlsDTO, projectDto } from './dto/create-project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(data: projectDto) {
    try {
      await this.findOne(data.devUrl, data?.uatUrl, data?.prodUrl);
      return await this.prisma.project.create({
        data,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findAll() {
    try {
      return this.prisma.project.findMany();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async findOne(
    devUrl?: string,
    uatUrl?: string,
    prodUrl?: string,
  ): Promise<Project | null> {
    console.log(devUrl, 'findOne url');
    if (!devUrl && !uatUrl && !prodUrl) {
      return Promise.reject('至少传入一个URL参数');
    }
    const query = [{ devUrl }] as EnvironmentUrlsDTO[];
    if (uatUrl) query.push({ uatUrl });
    if (prodUrl) query.push({ prodUrl });
    console.log(query, 'query');
    try {
      const res = await this.prisma.project.findFirst({
        where: {
          OR: query,
        },
      });
      console.log(res, 'findOne res');
      return res;
    } catch (error) {
      console.log(error, '未找到匹配项目');
      // 如果错误被捕获，则终止函数执行
      throw error;
    }
  }
}
