import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GasPrice } from './domain/gas-price';
import { ApiConfigService } from './config/api-config';

@Injectable()
export class GasPriceService {

    constructor(private readonly logger: Logger, private configService: ApiConfigService) {
    }

    async get(): Promise<GasPrice> {
        try {
            console.log("this.configService.blockNativeConfig", this.configService.blockNativeConfig)

            let config = { headers: { 'Authorization': this.configService.blockNativeConfig.apiKey, } };
            let { data } = await axios.get(this.configService.blockNativeConfig.url, config);

            return {
                system: data.system,
                network: data.network,
                unit: data.unit,
                maxPrice: data.maxPrice,
                currentBlockNumber: data.currentBlockNumber,
                msSinceLastBlock: data.msSinceLastBlock,
                blockPrices: data.blockPrices,
            };
        }
        catch (error) {
            console.log("error", error)
            let errorMessage =
                (error.response)
                    ? `error getting gas price: status: ${error.response.status} - msg: ${error.response.statusText}`
                    : error;
            this.logger.error(errorMessage);
            throw error;
        }
    }
}
