import { CacheInterceptor, CacheTTL, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GasPrice } from './domain/gas-price';
import { GasPriceService } from './gas-price.service';

@UseInterceptors(CacheInterceptor)
@Controller()
@ApiTags("gas-price")
export class GasPriceController {
  constructor(private readonly gasPriceService: GasPriceService) {}

  @Get()
  @CacheTTL(15)
  @ApiResponse({
    status: 200,
    description: 'Gas prices needed to have X% probability to qualify for inclusion in the next block',
    type: GasPrice
  })
  get(): Promise<GasPrice> {
    return this.gasPriceService.get();
  }
}
