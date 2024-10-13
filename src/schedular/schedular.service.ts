import { Injectable } from '@nestjs/common';
import { AlertService } from 'src/alert/alert.service';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { PriceService } from 'src/price/price.service';

@Injectable()
export class SchedularService {
    constructor(private readonly priceService: PriceService,private readonly alertService: AlertService) {
        setInterval(async () => {
            await this.savePriceCron();
        }, 300000); //Every 5 mins

        setInterval(async () => {
            await this.comparePriceCron();
        }, 60 * 60000); //Every hour

        setInterval(async () => {
            await this.checkAlerts();
        }, 20 * 60000); //Every 20 mins
        
    }
    // @Cron(CronExpression.EVERY_5_MINUTES)
    async savePriceCron() {
        console.log("Save ETH & POLY Price Cron Started");
        await this.priceService.trackAndSavePrices();
        console.log("Save ETH & POLY Price Cron Ended");
    }

    // @Cron(CronExpression.EVERY_HOUR)
    async comparePriceCron() {
        console.log("Compare ETH & POLY Price Cron Started");
        await this.priceService.check3PerPriceIncrease("ethereum");
        await this.priceService.check3PerPriceIncrease("polygon");
        console.log("Compare ETH & POLY Price Cron Ended");
    }

    async checkAlerts() {
        console.log("Check Alert Cron Started");
        await this.alertService.checkAlerts();
        console.log("Check Alert Cron Ended");
    }
}
