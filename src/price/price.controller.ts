import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './price.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPriceResponseDto } from './price.dto';

@ApiTags('price')
@Controller('price')
export class PriceController {
    constructor(private readonly priceService: PriceService) {}

    @Get('/hourly')
    @ApiResponse({ status: 201, description: 'Alert Created', type: GetPriceResponseDto})
    async getHourlyPrices(): Promise<Price[]> {
      return this.priceService.getHourlyPrices();
    }
}
