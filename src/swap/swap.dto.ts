import { ApiProperty } from "@nestjs/swagger";

export class GetSwapRateResponse {
    @ApiProperty({ description: 'BTC Amount'})
    btcAmount: number;
    @ApiProperty({ description: 'Ethereum Fee'})
    ethFee: number;
    @ApiProperty({ description: 'Fee in USD'})
    feeInUsd: number
}