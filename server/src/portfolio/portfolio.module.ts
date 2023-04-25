import { Module } from '@nestjs/common';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioController } from './controller/portfolio.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
