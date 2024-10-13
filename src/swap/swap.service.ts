import { Injectable } from '@nestjs/common';
import { CommanService } from 'src/comman/comman.service';
import { GetSwapRateResponse } from './swap.dto';

@Injectable()
export class SwapService {

  constructor(private readonly commanService: CommanService) {}

  public async calculateSwapRate(ethAmount: number): Promise<GetSwapRateResponse> {
    const { ethPrice, btcPrice } = await this.commanService.getEthAndBtcPrices();

    const btcAmount = (ethAmount * ethPrice) / btcPrice;

    const ethFee = ethAmount * 0.03;
    const feeInUsd = ethFee * ethPrice;

    return { btcAmount, ethFee, feeInUsd };
  }
}