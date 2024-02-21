import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  async createReport(body: any, projetId: number) {
    console.log(body, 'body');
    const report = {
      ...body?.data,
      stack: JSON.stringify(body?.stack),
      projectId: projetId,
      breadcrumb: JSON.stringify(body?.breadcrumb),
    };
    console.log(report, 'report');
  }
}
