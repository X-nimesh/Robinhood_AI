import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { StocksEntity } from 'src/stock-price/stock-list/stocks.entity';

@Entity({ name: 'portfolio_stocks' })
export class PortfolioStocksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_id' })
  stockID: number;

  @ManyToOne(() => StocksEntity, (stock) => stock.id)
  @JoinColumn({ name: 'stock_id' })
  stock: StocksEntity;

  @Column({ name: 'portfolio_id' })
  portfolioID: number;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: PortfolioEntity;

  @Column()
  purchase_price: number;

  @Column()
  quantity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  purchase_date: Date;
}
