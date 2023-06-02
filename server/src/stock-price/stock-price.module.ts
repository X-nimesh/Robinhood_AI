import { Module } from '@nestjs/common';
import { StockpriceController } from './stockprice.controller';
import { StockpriceService } from './stockprice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksEntity } from './model/stocks.entity';
import { SectorEntity } from './model/sectors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StocksEntity, SectorEntity])],
  controllers: [StockpriceController],
  providers: [StockpriceService],
})
export class StockPriceModule {}
