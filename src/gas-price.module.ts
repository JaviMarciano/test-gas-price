import { CacheModule, Logger, Module } from '@nestjs/common';
import { GasPriceController } from './gas-price.controller';
import { ConfigModule } from '@nestjs/config';
import { GasPriceService } from './gas-price.service';
import { configuration } from './config/configuration';
import { ApiConfigService } from './config/api-config';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${(process.env.NODE_ENV) ? process.env.NODE_ENV : ""}.env`,
      load: [configuration]
    }),
  ],
  controllers: [GasPriceController],
  providers: [
    Logger,
    GasPriceService,
    ApiConfigService
  ],
})
export class GasPriceModule { }
