import { Module, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma.service';
import { ReportService } from 'src/report/report.service';

@Module({
  providers: [ProjectService, PrismaService, ReportService],
  controllers: [ProjectController],
})
export class ProjectModule {}
