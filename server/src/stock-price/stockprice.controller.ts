import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { StockpriceService } from './stockprice.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock Price')
@ApiBearerAuth()
@Controller('stockprice')
export class StockpriceController {
  constructor(private readonly stockpriceService: StockpriceService) {}
  @Get()
  async getAllStocks(@Res() res) {
    const stocks = await this.stockpriceService.getAllStocks();
    res.status(200).json(stocks);
  }

  @Get('/search/')
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'search query',
    schema: { type: 'string' },
  })
  async searchStocks(@Res() res, @Query() query) {
    const stocks = await this.stockpriceService.searchStocks(query.query);
    res.status(200).json(stocks);
  }
}
