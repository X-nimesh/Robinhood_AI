import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SectorEntity } from '../model/sectors.entity';
import { PortfolioStocksEntity } from 'src/portfolio/model/portfolioStocks.entity';

@Entity({ name: 'stocks' })
export class StocksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_name' })
  stockName: string;

  @Column({ name: 'stock_symbol' })
  symbol: string;

  @OneToMany(() => PortfolioStocksEntity, (portfolio) => portfolio.stockID)
  portfolio: PortfolioStocksEntity[];

  @Column({ name: 'sector_id' })
  Sector: number;

  @ManyToOne(() => SectorEntity, (sector) => sector.id)
  @JoinColumn({ name: 'sector_id' })
  sector: SectorEntity;

  @Column({ name: 'total_shares' })
  totalShares: number;
}
