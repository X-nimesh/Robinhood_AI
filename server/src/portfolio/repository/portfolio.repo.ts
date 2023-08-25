import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioStocksEntity } from '../model/portfolioStocks.entity';
import { PortfolioEntity } from '../model/portfolio.entity';

@Injectable()
export class PortfolioRepo {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioEnity: Repository<PortfolioEntity>,

    @InjectRepository(PortfolioStocksEntity)
    private portfolioStockEnity: Repository<PortfolioStocksEntity>,
  ) {}
  async createPortfolio(uid: string) {
    const date = new Date();
    const created = this.portfolioEnity.create({
      userId: parseInt(uid),
      created_at: date,
      updated_at: date,
    });
    return this.portfolioEnity.save(created);
  }
  async getPortfolioByID(uid: string) {
    const uidNum = parseInt(uid);
    return this.portfolioEnity.findBy({ userId: uidNum });
  }
  async getPortfolioDetByID(pid: number) {
    return this.portfolioStockEnity.findBy({
      portfolioID: pid,
    });
  }
  async addStock(
    portfolioID,
    stockID,
    quantity,
    purchase_price,
    purchase_date,
  ) {
    const date = new Date();
    const created = this.portfolioStockEnity.create({
      portfolioID,
      stockID,
      quantity,
      purchase_price,
      purchase_date,
      created_at: date,
      updated_at: date,
    });

    return this.portfolioStockEnity.save(created);
  }
  async updateStock(
    pid: number,
    stockID: number,
    quantity: number,
    purchase_price: number,
    purchase_date: Date,
  ) {
    const existingStock = await this.portfolioStockEnity.findOne({
      where: {
        portfolioID: pid,
        stockID: stockID,
      },
    });

    const date = new Date();
    if (quantity > 0) {
      existingStock.purchase_price =
        (existingStock.purchase_price + purchase_price) / 2;
    }

    console.log('asd');
    console.log({ purchase_date, date });
    existingStock.quantity += quantity;
    existingStock.purchase_date = purchase_date;
    existingStock.updated_at = date;
    return this.portfolioStockEnity.save(existingStock);
  }

  async deleteStock(stockID: number) {
    return this.portfolioStockEnity.delete({
      stockID,
    });
  }
}
