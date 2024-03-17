import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      return Promise.reject(error);
    }
  }

  async findOne(
    devUrl?: string,
    uatUrl?: string,
    prodUrl?: string,
  ): Promise<Project | null> {
    try {
      if (!devUrl && !uatUrl && !prodUrl) {
        throw new Error('至少传入一个URL参数');
      }
      const query = [{ devUrl }] as EnvironmentUrlsDTO[];
      if (uatUrl) query.push({ uatUrl });
      if (prodUrl) query.push({ prodUrl });
      const res = await this.prisma.project.findFirst({
        where: {
          OR: query,
        },
      });

      if (res) return res;
      // throw new NotFoundException('未找到匹配项目');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('服务器内部错误');
    }
  }
}
