import { Body, Controller, Post } from '@nestjs/common';
import { projectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Controller('/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  async create(@Body() project: projectDto): Promise<any> {
    const res = await this.projectService.createProject(project);
    console.log(res, 'res');
    return 'This action adds a new project';
  }
}
