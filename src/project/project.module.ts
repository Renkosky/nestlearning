import { Module, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma.service';
import { ReportService } from 'src/report/report.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ProjectService, PrismaService, ReportService, UserService],
  controllers: [ProjectController],
})
export class ProjectModule {}
