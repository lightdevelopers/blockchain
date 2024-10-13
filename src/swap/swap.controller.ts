import { Controller, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { SwapService } from './swap.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetSwapRateResponse } from './swap.dto';

@Controller('swap')
@ApiTags('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('/rate')
  @ApiResponse({ status: 201, description: 'Swapped Done', type: GetSwapRateResponse})
  async getSwapRate(@Query('ethAmount') ethAmount: number) {
    if(!ethAmount) throw new BadRequestException("ethAmount query is missing!");
    const swapRate = await this.swapService.calculateSwapRate(ethAmount);
    return swapRate;
  }
}