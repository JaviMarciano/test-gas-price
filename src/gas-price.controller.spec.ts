import { CacheModule, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiConfigService } from './config/api-config';
import { GasPriceController } from './gas-price.controller';
import { GasPriceService } from './gas-price.service';

describe('AppController', () => {
  let gasPriceController: GasPriceController;
  const mockedGasPriceService = { get: jest.fn() };
  const mockedLogger = { error: jest.fn(), log: jest.fn() };
  let mockedApiConfig = {
    blockNativeConfig: {
      apiKey: "test",
      url: "/test"
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
      ],
      controllers: [GasPriceController],
      providers: [
        {
          provide: Logger, useValue: mockedLogger
        },
        {
          provide: ApiConfigService,
          useValue: mockedApiConfig,
        },
        {
          provide: GasPriceService,
          useValue: mockedGasPriceService
        },

      ],
    }).compile();

    gasPriceController = app.get<GasPriceController>(GasPriceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
     // expect(gasPriceController.get()).toBe('Hello World!');
    });
  });
});
