import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainService } from './services/domain/domain.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ProjectModule } from './project/project.module';
import { RulesController } from './rules/rules.controller';
import { RulesModule } from './rules/rules.module';
@Module({
  imports: [UserModule, ReportModule, ProjectModule, RulesModule],
  controllers: [AppController, RulesController],
  providers: [AppService, DomainService],
})
export class AppModule {}
