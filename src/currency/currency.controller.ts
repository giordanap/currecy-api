import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyRequestDto } from './dto';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { authMiddleware } from 'src/middleware';
import { FastifyReply } from 'fastify';

@ApiTags('currency')
@ApiBearerAuth()
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('calculate')
  @ApiHeaders([
    {
      name: 'token',
      required: true,
      schema: { type: 'string' },
    },
    {
      name: 'from',
      required: true,
      schema: { type: 'string' },
    },
    {
      name: 'to',
      required: true,
      schema: { type: 'string' },
    },
  ])
  async calculateCurrency(
    @Headers() headers,
    @Body() amount: number,
    @Res() res: FastifyReply,
  ) {
    const { from, to, token } = headers;
    authMiddleware(res, token);
    const response = await this.currencyService.calculateCurrency(
      amount,
      from,
      to,
    );
    return res.status(200).send({ data: [response] });
  }

  @Post('create')
  @ApiHeader({
    name: 'token',
    required: true,
    schema: { type: 'string' },
  })
  async createCurrency(
    @Headers() headers,
    @Body() currency: CreateCurrencyRequestDto,
    @Res() res: FastifyReply,
  ) {
    const { token } = headers;
    authMiddleware(res, token);
    const response = await this.currencyService.createCurrency(currency);
    return res.status(200).send({ data: [response] });
  }

  @Put('update/:id')
  @ApiHeaders([
    {
      name: 'token',
      required: true,
      schema: { type: 'string' },
    },
    {
      name: 'from',
      required: true,
      schema: { type: 'string' },
    },
    {
      name: 'to',
      required: true,
      schema: { type: 'string' },
    },
  ])
  async updateCurrency(
    @Headers() headers,
    @Param('id') id: string,
    @Body() rate: number,
    @Res() res: FastifyReply,
  ) {
    const { from, to, token } = headers;
    authMiddleware(res, token);
    const response = await this.currencyService.updateCurrency(
      id,
      from,
      to,
      rate,
    );
    return res.status(200).send({ data: [response] });
  }
}
