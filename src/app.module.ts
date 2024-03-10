import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainService } from './services/domain/domain.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ProjectModule } from './project/project.module';
import { RulesController } from './rules/rules.controller';
import { RulesModule } from './rules/rules.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config/jwt.config';
@Module({
  imports: [
    UserModule,
    ReportModule,
    ProjectModule,
    RulesModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AppController, RulesController],
  providers: [AppService, DomainService],
})
export class AppModule {}
