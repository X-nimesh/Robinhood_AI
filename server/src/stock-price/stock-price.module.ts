import { Module } from '@nestjs/common';
import { StockpriceController } from './stockprice.controller';
import { StockpriceService } from './stockprice.service';

@Module({
  controllers: [StockpriceController],
  providers: [StockpriceService],
})
export class StockPriceModule {}
