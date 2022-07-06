import { NestFactory } from '@nestjs/core';
import { GasPriceModule } from './gas-price.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GasPriceModule);

  const config = new DocumentBuilder()
    .setTitle('Gas price service')
    .setDescription('Ethereum gas price prediction')
    .setVersion('1.0')
    .addTag('gas-price')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
