import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { projectDto } from './dto/create-project.dto';

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
}
