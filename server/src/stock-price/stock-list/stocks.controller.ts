import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import axios from 'axios';
import fetch from 'node-fetch';

@ApiTags('stock list')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('/')
  async getAll() {
    return this.stockService.getAllStocks();
  }

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
}
