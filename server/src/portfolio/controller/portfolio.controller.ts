import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from '../services/portfolio.service';
import { addStockDto } from '../portfolioStocks.dto';
import fetch from 'node-fetch';

@ApiTags('Portfolio')
@ApiBearerAuth()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  @Get()
  async getSharePrice() {
    return this.portfolioService.getPrices();
  }

  @Get('/user/:uid')
  async getPortfoliobyUID(@Param('uid') uid: string) {
    return this.portfolioService.getPortfolioByUID(uid);
  }
  @Post('/stock/add/:pid')
  async addStocks(@Param('pid') pid: number, @Body() data: addStockDto) {
    console.log(pid, data);
    return this.portfolioService.addStock(pid, data);
  }
  @Get('/get/trial')
  async getTrail() {
    // fetch historic data
    // https://nepsealpha.com/trading/0/history?symbol=NABIL&resolution=1D&from=1654300800&to=1686528000&pass=ok&force=0.6452559353767582&currencyCode=NRS

    // * get all the stock list
    // const data = await fetch(
    //   'https://nepsealpha.com/trading/1/search?limit=500',
    // );

    // * get the price of certain stock
    // const data = await fetch(
    //   'https://nepsealpha.com/trading/0/history?symbol=NABIL&resolution=1D&from=1654300800&to=1686528000&pass=ok&force=0.6452559353767582&currencyCode=NRS',
    // );

    // * sector details
    // const data = await fetch(
    //   `https://nepsealpha.com/api/smx9841/dashboard_board`,
    // );
    // * get live share price
    const data = await fetch(`https://www.nepalipaisa.com/api/GetStockLive`);
    const json = await data.json();

    return json;
  }
  @Get('/rsi?')
  async getRsi(@Query('symbol') symbolId: string) {
    return this.portfolioService.calculateRSI(symbolId);
  }
  @Get('/:pid')
  async getPortfoliobyPID(@Param('pid') pid: string) {
    const pidNum = parseInt(pid);
    return this.portfolioService.getPortfoliosItemsByID(pidNum);
  }
  @Get('/stock/history/:sid')
  async getStockHistory(@Param('sid') sid: string) {
    // const sidNum = parseInt(sid);
    return this.portfolioService.getStockDetails(sid);
  }
  @Delete('stock/:sid')
  async deleteStock(@Param('sid') sid: number) {
    return this.portfolioService.deleteStock(sid);
  }
}
