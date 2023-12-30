import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { Repository } from 'typeorm';
import { CalculateCurrencyResponseDto } from './dto/calculateCurrencyResponse.dto';
import { CreateCurrencyRequestDto } from './dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async calculateCurrency(amount: number, from: string, to: string) {
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        origin_currency: from,
        target_currency: to,
      },
    });

    if (!currencyFound)
      return new HttpException('Destinations not found', HttpStatus.NOT_FOUND);

    const { id, rate, origin_currency, target_currency } = currencyFound;
    const amountChanged = amount * rate;
    const amountCalculated = new CalculateCurrencyResponseDto(
      amount,
      amountChanged,
      origin_currency,
      target_currency,
      rate,
    );

    return amountCalculated;
  }

  async createCurrency(currency: CreateCurrencyRequestDto) {
    const { origin_currency, target_currency } = currency;
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        origin_currency,
        target_currency,
      },
    });

    if (currencyFound)
      return new HttpException('currency already exists', HttpStatus.CONFLICT);

    const newCurrency = this.currencyRepository.create(currency);
    return this.currencyRepository.save(newCurrency);
  }

  async updateCurrency(id: string, from: string, to: string, rate: number) {
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        id,
      },
    });

    if (!currencyFound)
      return new HttpException('currency not found', HttpStatus.NOT_FOUND);

    const { origin_currency: fromFound, target_currency: toFound } =
      currencyFound;

    if (from !== fromFound || to !== toFound)
      return new HttpException('can only change the rate', HttpStatus.CONFLICT);

    return this.currencyRepository.update({ id }, { rate });
  }
}
