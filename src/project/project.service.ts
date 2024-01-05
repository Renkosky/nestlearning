import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { projectDto } from './dto/create-project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(data: projectDto) {
    try {
      return this.prisma.project.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async findAll() {
    try {
      return this.prisma.project.findMany();
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(url: string): Promise<Project | null> {
    console.log(url, 'findOne url');
    try {
      return this.prisma.project.findFirst({
        where: {
          OR: [{ devUrl: url }, { uatUrl: url }, { prodUrl: url }],
        },
      });
    } catch (error) {
      console.log(error, '未找到匹配项目');
    }
  }
}
