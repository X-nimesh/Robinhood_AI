import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';

@Entity({ name: 'portfolio_stocks' })
export class PortfolioStocksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_name' })
  stockName: string;

  @Column()
  desc: string;

  @Column({ name: 'portfolio_id' })
  portfolioID: number;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: PortfolioStocksEntity;

  @Column()
  purchase_price: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
