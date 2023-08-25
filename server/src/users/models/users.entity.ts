import { PortfolioEntity } from 'src/portfolio/model/portfolio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user)
  portfolio: PortfolioEntity[];

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
