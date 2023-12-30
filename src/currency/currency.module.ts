import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
