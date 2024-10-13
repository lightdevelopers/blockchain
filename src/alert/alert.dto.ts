import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class  SetAlertRequest {
    @IsString({always: true})
    @ApiProperty({ description: 'Chain name', required: true})
    chain: "ethereum" | "polygon";
    @IsNumber({allowNaN: false})
    @ApiProperty({ description: 'Price Limit', required: true})
    dollar: number;
    @ApiProperty({ description: 'Email to send alert', required: true})
    @IsEmail()
    email: string;
}

export class  SetAlertResponse {
    @ApiProperty({ description: 'Alert Id', required: true})
    id: number;
    @ApiProperty({ description: 'Chain name', required: true})
    chain: string;
    @ApiProperty({ description: 'Price Limit', required: true})
    dollar: number;
    @ApiProperty({ description: 'Email to send alert', required: true})
    email: string;
}