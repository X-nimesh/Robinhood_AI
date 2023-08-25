import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersEntity } from 'src/users/models/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.strategy';
import { PortfolioEntity } from 'src/portfolio/model/portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PortfolioEntity]),
    JwtModule.register({
      secret: 'secretNimesh',
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStategy],
  controllers: [AuthController],
})
export class AuthModule {}
