import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(@Request() req): { data: string } {
    return this.appService.getTest();
  }
  @Post('/upload')
  getData(@Request() req): any {
    return { data: req.body };
  }
}
