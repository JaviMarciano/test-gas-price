import { Test, TestingModule } from '@nestjs/testing';
import { GasPriceService } from './gas-price.service';
import axios from 'axios';
import { ApiConfigService } from './config/api-config';
import { Logger } from '@nestjs/common';
import { GasPrice } from './domain/gas-price';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GasPriceService', () => {
  let gasPriceService: GasPriceService;
  const mockedLogger = { error: jest.fn(), log: jest.fn() };
  const blockNativeResponseTest: GasPrice = {
    system: "ethereum",
    network: "mainnet",
    unit: "1",
    maxPrice: 1,
    currentBlockNumber: 1,
    msSinceLastBlock: 1,
    blockPrices: []
  }

  let mockedApiConfig = {
    blockNativeConfig: {
      apiKey: "test",
      url: "/test"
    },
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Logger, useValue: mockedLogger
        },
        {
          provide: ApiConfigService,
          useValue: mockedApiConfig,
        },
        GasPriceService

      ],
    }).compile();

    gasPriceService = module.get<GasPriceService>(GasPriceService);
  });

  it('should be defined', () => {
    expect(gasPriceService).toBeDefined();
  });

  it('should return block native response', async () => {
    mockedAxios.get.mockResolvedValue({ data: blockNativeResponseTest });
    const gasPrice = await gasPriceService.get();
    expect(gasPrice.system).toBe(blockNativeResponseTest.system);
    expect(gasPrice.network).toBe(blockNativeResponseTest.network);
    expect(gasPrice.unit).toBe(blockNativeResponseTest.unit);
    expect(gasPrice.maxPrice).toBe(blockNativeResponseTest.maxPrice);
    expect(gasPrice.currentBlockNumber).toBe(blockNativeResponseTest.currentBlockNumber);
    expect(gasPrice.msSinceLastBlock).toBe(blockNativeResponseTest.msSinceLastBlock);
    expect(gasPrice.blockPrices).toBe(blockNativeResponseTest.blockPrices);
  });


  it('should fail when environment variable not set');

  it('should log unouthorized when api key is not correct', async () => {
    mockedAxios.get.mockRejectedValue({
      status: 401,
      msg: 'Unauthorized',
      data: { msg: 'Authorization header must contain a valid API key.' }
    });

    const failedMessage = "error getting gas price: status: 401 - msg: Unauthorized";
    const errorSpy = jest.spyOn(mockedLogger, 'error').getMockImplementation();

    expect(errorSpy).toHaveBeenCalledWith(failedMessage);
  });
});


