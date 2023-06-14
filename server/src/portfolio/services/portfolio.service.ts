import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioRepo } from '../repository/portfolio.repo';
import { StocksRepo } from 'src/stock-price/stock-list/stocks.repo';
import { addStockDto } from '../portfolioStocks.dto';
import { TranscactionType } from '../portfolio.enum';

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
  async getPortfoliosByID(pid: number) {
    const portfolioItems = await this.portfolioRepo.getPortfolioDetByID(pid);

    // * array of promis to resolve from Promise.all method
    const stockPromises = portfolioItems.map((data) =>
      this.stocksRepo.getOnebyId(data.stockID),
    );
    const stock = await Promise.all(stockPromises);

    //* stock ko data ra posrtfolio ko data combine
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
}
