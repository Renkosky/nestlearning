import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainService } from './services/domain/domain.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DomainService],
})
export class AppModule {}
