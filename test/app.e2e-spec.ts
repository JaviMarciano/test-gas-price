import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GasPriceModule } from '../src/gas-price.module';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { GasPriceService } from 'src/gas-price2.service';

describe('AppController (e2e)', () => {
  let gasPrice: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GasPriceModule,
        CacheModule.register()
      ],
      providers: [GasPriceService],
    }).compile();

    gasPrice = moduleFixture.createNestApplication();
    await gasPrice.init();
  });

  it('/ (GET)', () => {

    var mock = new MockAdapter(axios);
    mock.onGet("/users", { params: { searchText: "John" } }).reply(200, {
      users: [{ id: 1, name: "John Smith" }],
    });

    axios
      .get("/users", { params: { searchText: "John" } })
      .then(function (response) {
        console.log(response.data);
      });

    return request(gasPrice.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
