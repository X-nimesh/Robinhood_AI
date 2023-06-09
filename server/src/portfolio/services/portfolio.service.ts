import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioRepo } from '../repository/portfolio.repo';
import { StocksRepo } from 'src/stock-price/stock-list/stocks.repo';
import { addStockDto } from '../portfolioStocks.dto';
import { TranscactionType } from '../portfolio.enum';
import axios from 'axios';
import { parse } from 'path';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly portfolioRepo: PortfolioRepo,
    private readonly stocksRepo: StocksRepo,
  ) {}

  async getPrices() {
    return 'price';
  }
  async getPortfolioByUID(uid: string) {
    const portfolioDet = await this.portfolioRepo.getPortfolioByID(uid);
    console.log(portfolioDet);
    return portfolioDet;
  }
  //   async getportfoliosbyID(pid: number) {
  //     const portfolioItems = await this.portfolioRepo.getPortfolioDetByID(pid);
  //     const items = [];
  //     const stock = await Promise.all(
  //       portfolioItems.map(async (data, index) => {
  //         return this.stocksRepo.getOnebyId(data.stockID);
  //       }),
  //     );
  //     portfolioItems.forEach((data, index) => {
  //       items[index] = {
  //         ...portfolioItems[index],
  //         ...stock[index],
  //       };
  //     });
  //     console.log(items);
  //     return items;
  //   }
  async getPortfoliosItemsByID(pid: number) {
    const portfolioItems = await this.portfolioRepo.getPortfolioDetByID(pid);
    // * array of promis to resolve from Promise.all method
    const stockPromises = portfolioItems.map(
      (data) => this.stocksRepo.getOnebyId(data.stockID)[0],
    );
    const stock = await Promise.all(stockPromises);

    //* stock ko data ra portfolio ko data combine
    const items = portfolioItems.map((data, index) => ({
      ...data,
      ...stock[index],
    }));
    return items;
  }

  async addStock(pid, data: addStockDto) {
    // const stockData = await this.getPortfoliosByID(pid);
    // if (stockData.find((stock) => stock.id == data.stockSymId)) {
    //   if (data.transitionType === TranscactionType.buy) {
    //     this.portfolioRepo;
    //   }
    //}
    return this.portfolioRepo.addStock(
      pid,
      data.stockSymId,
      data.quantity,
      data.purchasePrice,
      data.purchaseDate,
    );
  }
  //   funstion to calculate rsi
  rsifromClosingPrice(closePrices) {
    const prices = closePrices.map(Number).reverse();
    const days = 14;
    let sumGain = 0;
    let sumLoss = 0;

    for (let i = 1; i < closePrices.length; i++) {
      if (i > days) break;
      const difference = prices[i] - prices[i - 1];

      if (difference >= 0) {
        sumGain += difference;
      } else {
        sumLoss -= difference;
      }
      console.log(difference);
      console.log('loss:-' + sumLoss);
    }
    if (sumGain === 0) return 0;
    if (Math.abs(sumLoss) < Number.EPSILON) return 100;

    const relativeStrength = sumGain / sumLoss;

    const rsi = 100.0 - 100.0 / (1 + relativeStrength);
    return rsi;
  }
  async calculateRSI(symbolId: string) {
    let stockData = await this.stocksRepo.getOnebyId(parseInt(symbolId));
    stockData = stockData[0];
    console.log(stockData);
    const symbol = stockData?.symbol;
    // bring the todays date and 14 day ago time in epoch timestamp
    const today = new Date();
    const fourteenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30,
    );
    const todayEpoch = Math.floor(today.getTime() / 1000);
    const fourteenDaysAgoEpoch = Math.floor(fourteenDaysAgo.getTime() / 1000);
    console.log('rsi');
    const url = `https://nepsealpha.com/trading/0/history?symbol=${symbol}&resolution=1D&from=${fourteenDaysAgoEpoch}&to=${todayEpoch}&pass=ok&force=0.9015580012767925&currencyCode=NRS`;
    const data = await axios.get(url);
    if (data.data.s === 'no_data') return { message: 'no data found' };
    const closePrice = data.data.c;
    const rsi = this.rsifromClosingPrice(closePrice);

    console.log(rsi);
    return { stockName: stockData.stockName, symbol: stockData.symbol, rsi };
  }
}
