import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioRepo } from '../repository/portfolio.repo';

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepo: PortfolioRepo) {}
  async getPrices() {
    return 'price';
  }
  async getPortfolioByUID(uid: string) {
    const portfolioDet = await this.portfolioRepo.getPortfolioByID(uid);
    console.log(portfolioDet);
    return portfolioDet;
  }
  async getportfoliosbyID(pid: number) {
    const portfolioItems = await this.portfolioRepo.getPortfolioDetByID(pid);
    return portfolioItems;
  }
}
