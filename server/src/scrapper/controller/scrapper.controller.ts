import { Controller, Get, Param } from '@nestjs/common';
import { ScrapperService } from '../services/scrapper.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Scrapper')
@Controller('scrap')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get()
  async scrap() {
    return await this.scrapperService.scrapAllPrice();
  }
  @Get('/test')
  async scraptry() {
    return await this.scrapperService.scrapTry();
  }
  @Get('/test2')
  async scraptry2() {
    return await this.scrapperService.scrapAllStock();
    // return await this.scrapperService.scrapAlltryPrice();
  }
  @Get('/company/:company')
  async scrapCompany(@Param('company') company: string) {
    return await this.scrapperService.scrapCompany(company);
  }
}
