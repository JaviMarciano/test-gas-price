import { ApiProperty } from '@nestjs/swagger';

class EstimatedPrices {
    @ApiProperty()
    confidence: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    maxPriorityFeePerGas: number;
    @ApiProperty()
    maxFeePerGas: number;
}

class BlockPrices {
    @ApiProperty()
    blockNumber: number;
    @ApiProperty()
    estimatedTransactionCount: number;
    @ApiProperty()
    baseFeePerGas: number;
    @ApiProperty({ type: [EstimatedPrices] })
    estimatedPrices: EstimatedPrices[];
}

export class GasPrice {
    @ApiProperty()
    system: string;
    @ApiProperty()
    network: string;
    @ApiProperty()
    unit: string;
    @ApiProperty()
    maxPrice: number;
    @ApiProperty()
    currentBlockNumber: number;
    @ApiProperty()
    msSinceLastBlock: number;
    @ApiProperty({ type: [BlockPrices] })
    blockPrices: BlockPrices[];
}
