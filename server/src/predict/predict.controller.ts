import { Controller, Get } from '@nestjs/common';
import { PredictService } from './predict.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Predict')
@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}
  @Get()
  predictStockPrice() {
    const input = [1, 2, 3, 4, 5];
    return this.predictService.predictStockPrice(input);
  }
  @Get('/train')
  trainModel() {
    const input = [1, 2, 3, 4, 5];
    return this.predictService.trainModel();
  }
}
