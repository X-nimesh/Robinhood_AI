import { UsersEntity } from 'src/users/models/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'portfolio' })
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
