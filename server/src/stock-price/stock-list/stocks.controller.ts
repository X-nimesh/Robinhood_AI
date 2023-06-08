import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StocksService } from './stocks.service';

@ApiTags('stock list')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('/')
  async getAll() {
    return this.stockService.getAllStocks();
  }
}
