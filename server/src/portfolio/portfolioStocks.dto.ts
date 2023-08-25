import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Validate, ValidateIf } from 'class-validator';

export class addStockDto {
  @ApiProperty()
  @IsNotEmpty()
  purchaseDate: string;

  @ApiProperty()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  stockSymId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['buy', 'sell'])
  transitionType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['IPO', 'Secondary', 'FPO', 'Bonus', 'Right'])
  type: string;
}
