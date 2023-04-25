import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from '../services/portfolio.service';

@ApiTags('Portfolio')
@ApiBearerAuth()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  @Get()
  async getSharePrice() {
    return this.portfolioService.getPrices();
  }
}
