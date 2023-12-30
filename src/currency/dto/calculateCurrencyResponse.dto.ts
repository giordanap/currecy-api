import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CalculateCurrencyResponseDto {
  @IsDecimal()
  @IsNotEmpty()
  private amount: number;

  @IsDecimal()
  @IsNotEmpty()
  private amountChanged: number;

  @IsString()
  @IsNotEmpty()
  private origin_currency: string;

  @IsString()
  @IsNotEmpty()
  private target_currency: string;

  @IsDecimal()
  @IsNotEmpty()
  private rate: number;

  constructor(
    amount: number,
    amountChanged: number,
    origin_currency: string,
    target_currency: string,
    rate: number,
  ) {
    this.amount = amount;
    this.amountChanged = amountChanged;
    this.origin_currency = origin_currency;
    this.target_currency = target_currency;
    this.rate = rate;
  }
}
