import { Module } from '@nestjs/common';
import { ScrapperController } from './controller/scrapper.controller';
import { ScrapperService } from './services/scrapper.service';
import { PuppeteerModule } from 'nest-puppeteer';
@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
