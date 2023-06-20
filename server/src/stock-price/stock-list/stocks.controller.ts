import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import axios from 'axios';
import fetch from 'node-fetch';

@ApiTags('stock list')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}
  @Get('/live')
  async getLivePrice() {
    const data = await fetch(`https://www.nepalipaisa.com/api/GetStockLive`);
    const json = await data.json();

    // const liveData = await axios.get(
    //   'https://www.nepalipaisa.com/api/GetStockLive',
    // );
    // console.log(liveData);
    // return liveData;
    return json;
  }
  @Get('/')
  async getAll() {
    return this.stockService.getAllStocks();
  }
  @Get('/:id')
  async getOneStock(@Param('id') id: string) {
    return this.stockService.getOneStock(parseInt(id));
  }
  @Get('/companyDetails/:id')
  async getCompanyDetails(@Param('id') id: string) {
    const stock = await this.getOneStock(id);
    const companyDetails = await axios.get('/');
    return companyDetails.data;
  }

  @Get('/company/:id')
  async getCompanyStock(@Param('id') id: string) {
    const stock = await this.getOneStock(id);
    const stockPrice = await axios.get(
      `https://nepsealpha.com/trading/0/history?symbol=${stock?.symbol}&resolution=1D&from=1685556900&to=1686800395&pass=ok&force=0.9015580012767925&currencyCode=NRS`,
    );
    return stockPrice.data;
  }
}
