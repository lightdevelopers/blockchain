import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { SetAlertRequest, SetAlertResponse } from './alert.dto';
import { CommanService } from 'src/comman/comman.service';
import { Constants } from 'src/constants/Constants';

@Injectable()
export class AlertService {

    constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private readonly commanService: CommanService
    ) {}

    public async setAlert(alert: SetAlertRequest): Promise<SetAlertResponse> {
        const alertEntity = await this.alertRepository.save(alert);
        return alertEntity;
    }

    public async checkAlerts() {
        const {ethereum, polygon} = await this.commanService.getEthAndPolyPrices();
        const alerts = await this.alertRepository.find();
        const matchedAlerts = alerts.filter(alert => {
            if(alert.chain == Constants.ETHERUM && ethereum > alert.dollar) return true;
            if(alert.chain == Constants.POLYGON && polygon > alert.dollar) return true;
            return false;
        });

        for(const alert of matchedAlerts) {
            const {email, id, chain, dollar} = alert;
            await this.commanService.sendEmail(email, "Alert Hit", `Your alert for ${chain} has been hit. Price of ${chain} is greater than ${dollar}`);
            await this.alertRepository.delete({id: id});
        }

    }
}
