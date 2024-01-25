import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RuleDto } from './dto/rules.dto';

@Controller('rules')
export class RulesController {
  @Get()
  findRulesByProjectId(@Query() query: any) {
    console.log(query);
    return 'This action returns all rules';
  }
  @Post()
  createRule(@Body() body: RuleDto) {
    return 'This action adds a new rule';
  }
}
