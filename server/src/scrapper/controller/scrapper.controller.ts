import { Controller, Get } from '@nestjs/common';
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
}
