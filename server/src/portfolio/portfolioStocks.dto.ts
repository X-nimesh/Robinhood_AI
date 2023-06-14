import { IsIn, IsNotEmpty, Validate, ValidateIf } from 'class-validator';

export class addStockDto {
  @IsNotEmpty()
  purchaseDate: string;

  @IsNotEmpty()
  purchasePrice: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  stockSymId: number;

  @IsNotEmpty()
  @IsIn(['buy', 'sell'])
  transitionType: string;

  @IsNotEmpty()
  @IsIn(['IPO', 'Secondary', 'FPO', 'Bonus', 'Right'])
  type: string;
}
