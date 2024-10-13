import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import {SetAlertRequest, SetAlertResponse } from './alert.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('alert')
@Controller('alert')
export class AlertController {

    constructor(private readonly alertService: AlertService) {}

    @Post('/alert')
    @ApiResponse({ status: 201, description: 'Alert Created', type: SetAlertResponse})
    public async setAlert(@Body() alert: SetAlertRequest): Promise<SetAlertResponse> {
        const alertEntity = await this.alertService.setAlert(alert);
        return alertEntity;
    }

}
