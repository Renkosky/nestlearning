import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { reportDto } from './dto/create-report.dto';
import { Prisma } from '@prisma/client';
import { findReportDto } from './dto/find-report.dto';
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  async createReport(body: reportDto, projectId: number) {
    const {
      data: { type, stack, level, url, time, name, message },
      breadcrumb,
    } = body;
    const data = {
      errorId: body?.data?.errorId,
      projectId,
      type,
      name,
      level,
      createdAt: new Date(time),
      url,
      message,
      stack,
      breadcrumb,
    };

    try {
      return await this.prisma.report.create({ data });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getReportByProjectId(projectId: number) {
    return await this.prisma.report.findMany({
      where: { projectId: projectId },
    });
  }
  async findReport(param: findReportDto) {
    console.log(param);
    return await this.prisma.report.findMany({
      where: {
        ...param,
      },
    });
  }
  async getReportById(id, errorId: number) {
    return await this.prisma.report.findUnique({ where: { errorId, id } });
  }

  async changeResloved(id, stat: boolean) {
    return await this.prisma.report.update({
      where: { id },
      data: {
        resolved: stat,
      },
    });
  }
}
