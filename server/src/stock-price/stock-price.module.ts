import { Module } from '@nestjs/common';
import { StockpriceController } from './stockprice.controller';
import { StockpriceService } from './stockprice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksEntity } from './stock-list/stocks.entity';
import { SectorEntity } from './model/sectors.entity';
import { StocksController } from './stock-list/stocks.controller';
import { StocksService } from './stock-list/stocks.service';
import { StocksRepo } from './stock-list/stocks.repo';

@Module({
  imports: [TypeOrmModule.forFeature([StocksEntity, SectorEntity])],
  controllers: [StockpriceController, StocksController],
  providers: [StockpriceService, StocksService, StocksRepo],
  exports: [StocksRepo],
})
export class StockPriceModule {}
