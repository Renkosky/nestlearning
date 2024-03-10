import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { reportDto } from './dto/create-report.dto';
import { ProjectService } from 'src/project/project.service';
import { ReportService } from './report.service';
import { URL } from 'url';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reportService: ReportService,
  ) {}
  @Post()
  async saveReport(@Body() body: reportDto) {
    if (body?.data?.url) {
      const parsedUrl = new URL(body?.data?.url);

      const res = await this.projectService.findOne(
        `${parsedUrl.protocol}//${parsedUrl.hostname}`,
      );
      if (res) {
        const createRes = await this.reportService.createReport(body, res.id);
        console.log(createRes, 'createRes');
        return { code: 0, msg: 'success' };
      }
    } else {
      throw new BadRequestException('url不能为空');
      // return { code: -1, data: null, msg: 'url不能为空' };
    }
  }

  @Post('/detail')
  async getReportByPojectId(@Body() body: { id: number }) {
    if (!body?.id) throw new BadRequestException('项目id不能为空');
    const res = await this.reportService.getReportByProjectId(Number(body?.id));
    if (res) return { code: 0, data: res };
  }
}
