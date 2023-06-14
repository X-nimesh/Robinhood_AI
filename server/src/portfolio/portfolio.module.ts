import { Module } from '@nestjs/common';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioController } from './controller/portfolio.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './model/portfolio.entity';
import { PortfolioStocksEntity } from './model/portfolioStocks.entity';
import { PortfolioRepo } from './repository/portfolio.repo';
import { StocksRepo } from 'src/stock-price/stock-list/stocks.repo';
import { StockPriceModule } from 'src/stock-price/stock-price.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity, PortfolioStocksEntity]),
    StockPriceModule,
  ],
  providers: [PortfolioService, PortfolioRepo],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
