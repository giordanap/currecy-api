import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCurrencyRequestDto {
  @IsString()
  @IsNotEmpty()
  origin_currency: string;

  @IsString()
  @IsNotEmpty()
  target_currency: string;

  @IsNotEmpty()
  rate: number;
}
