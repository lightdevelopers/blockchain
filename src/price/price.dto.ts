import { ApiProperty } from "@nestjs/swagger";

export class GetPriceResponseDto {
    @ApiProperty({ description: 'ID'})
    id: number;
    @ApiProperty({ description: 'Chain name'})
    chain: "ethereum" | "polygon";

    @ApiProperty({ description: 'Chain Price'})
    price: number;
    @ApiProperty({ description: 'Date/Time'})
    timestamp: Date;
}