import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { CommanService } from 'src/comman/comman.service';
import { Constants } from 'src/constants/Constants';

@Injectable()
export class PriceService {
    constructor(
      @InjectRepository(Price)
      private priceRepo: Repository<Price>,
      private readonly commanService: CommanService
    ) {}

    public async trackAndSavePrices(): Promise<void> {
        const {ethereum, polygon} = await this.commanService.getEthAndPolyPrices();
        
        const prices = [{ chain: Constants.ETHERUM, price: ethereum }, { chain: Constants.POLYGON, price: polygon }]

        await this.priceRepo.save(prices);
    }

    public async check3PerPriceIncrease(chain: string) {
      const currentChainPrice = await this.commanService.getEthAndPolyPrices();
      const chainLastPrice = await this.getLastHourPrice(chain);

      if(currentChainPrice.ethereum >= 1.03 * chainLastPrice.price) {
        await this.commanService.sendEmail("hyperhire_assignment@hyperhire.in", `${chain} price increased`, `The price of ${chain} has increased by more than 3%. Current price: ${currentChainPrice.ethereum}`)
      }

    }

    public async getHourlyPrices(): Promise<Price[]> {
        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);
      
        return this.priceRepo.find({
          where: { timestamp: MoreThan(oneDayAgo) },
          order: { timestamp: 'DESC' },
        });
      }

      private async getLastHourPrice(chain: string): Promise<Price> {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() - 1);
        
        const price = await this.priceRepo.findOne({
          where: {timestamp: LessThanOrEqual(currentTime), chain: chain},
        });

        return price;
      }
}
