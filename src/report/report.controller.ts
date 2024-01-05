import { Body, Controller, Post, Request } from '@nestjs/common';
import { reportDto } from './dto/create-report.dto';
import { ProjectService } from 'src/project/project.service';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reportService: ReportService,
  ) {}
  @Post()
  async saveReport(@Body() body: reportDto) {
    console.log(body?.data?.url, 'body');
    if (body?.data?.url) {
      try {
        const res = await this.projectService.findOne(body.data.url);
        console.log(res, 'res');
        if (res) {
          // this.reportService.createReport(body, res.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return 'This action adds a new report';
  }
}
