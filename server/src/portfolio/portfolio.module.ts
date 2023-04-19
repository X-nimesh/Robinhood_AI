import { Module } from '@nestjs/common';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioController } from './controller/portfolio.controller';

@Module({
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
