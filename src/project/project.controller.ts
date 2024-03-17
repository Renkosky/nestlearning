import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { projectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { ReportService } from '../report/report.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
@UseGuards(JwtAuthGuard)
@Controller('/project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reportService: ReportService,
    private readonly userService: UserService,
  ) {}
  @Post()
  async create(@Body() project: projectDto, @Req() req: any): Promise<any> {
    const projectData = {
      ...project,
      created_at: new Date(),
      ownerId: req.user.id,
    };
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

  @Post('/report')
  async getReport(@Body() body) {
    if (!body?.projectId) throw new BadRequestException('项目id不能为空');

    const res = await this.reportService.findReport(body);
    if (res) return { code: 0, data: res };
  }

  @Get('/my')
  async myProjects(@Req() request) {
    console.log(request.user, 'req');
    const user = await this.userService.findOneUser({
      id: (request.user as User).id,
    });
    if (!user) {
      throw new HttpException('用户不存在', 400);
    }
    const projects = await this.userService.findUserProjects({
      where: { id: (request.user as User).id },
    });
    return { code: 0, data: projects };
  }
}
