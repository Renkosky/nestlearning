import { Body, Controller, Post } from '@nestjs/common';
import { projectDto } from './dto/create-project.dto';

@Controller('/project')
export class ProjectController {
  @Post()
  create(@Body() project: projectDto): string {
    return 'This action adds a new project';
  }
}
