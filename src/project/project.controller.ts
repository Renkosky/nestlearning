import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { projectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { ReportService } from '../report/report.service';
@Controller('/project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reportService: ReportService,
  ) {}
  @Post()
  async create(@Body() project: projectDto): Promise<any> {
    const projectData = { ...project, created_at: new Date() };
    try {
      const res = await this.projectService.createProject(projectData);
      return { code: 0, data: res, msg: 'success' };
    } catch (error) {
      console.log(error, 'ProjectController error');
      return { code: -1, msg: error };
    }
  }
  @Get()
  async findAll(): Promise<any> {
    try {
      const res = await this.projectService.findAll();
      return { code: 0, data: res, msg: 'success' };
    } catch (error) {
      return { code: -1, data: null, msg: error };
    }
  }
  @Get()
  async findOne(@Param() param): Promise<any> {
    if (!param?.id) return { code: -1, data: null, msg: 'id不能为空' };
    try {
      const res = await this.projectService.findOne(param?.id);
      if (res) {
        return { code: 0, data: res, msg: 'success' };
      } else {
        throw new NotFoundException('未找到匹配项目');
      }
    } catch (error) {
      return { code: -1, data: null, msg: error };
    }
  }

  @Get('/detail')
  async getReportByPId(@Query() param) {
    if (!param?.id) throw new BadRequestException('项目id不能为空');
    const res = await this.reportService.getReportByProjectId(
      Number(param?.id),
    );
    if (res) return { code: 0, data: res };
  }
}
