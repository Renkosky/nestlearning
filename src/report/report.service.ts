import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { reportDto } from './dto/create-report.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  async createReport(body: reportDto, projectId: number) {
    const { data:{type,stack,level,url,time, name,message}, breadcrumb, } = body;
    const data = {
      id: body?.data?.errorId,
      projectId,
      type,
      name,
      level,
      createdAt: new Date(time),
      url,
      message,
      stack,
      breadcrumb
    };

    try {
      return await this.prisma.report.create(
        {data} 
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
  async getReportByProjectId(projectId:number){
    return  await this.prisma.report.findMany(
      {where:{projectId:projectId}}
    )
  }
}
