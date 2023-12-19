import { Body, Controller, Post } from '@nestjs/common';

@Controller('monitor')
export class MonitorController {
  @Post('/upload')
  create(@Body() body) {
    console.log(body);
    return;
  }
}
