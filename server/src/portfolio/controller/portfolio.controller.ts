import { Controller, Get, Param } from '@nestjs/common';
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
  @Get('/user/:uid')
  async getPortfoliobyUID(@Param('uid') uid: string) {
    return this.portfolioService.getPortfolioByUID(uid);
  }
  @Get('/:pid')
  async getPortfoliobyPID(@Param('pid') pid: string) {
    const pidNum = parseInt(pid);
    return this.portfolioService.getportfoliosbyID(pidNum);
  }
}
