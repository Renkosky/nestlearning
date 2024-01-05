import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma.service';
import { ProjectService } from 'src/project/project.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ProjectService, PrismaService],
})
export class ReportModule {}
