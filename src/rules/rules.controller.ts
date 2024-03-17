import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RuleDto } from './dto/rules.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
