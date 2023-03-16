import { NestFactory } from '@nestjs/core';
import { Transport } from "@nestjs/microservices";
import { AppModule } from './modules/app.module';
import { Logger } from "@nestjs/common";
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const microservice = await app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: "localhost", //api for docker
      port: 3002
    }
  });
  await app.startAllMicroservices();
  await app.listen(3001).then(() => logger.log('API working'));
}
bootstrap();
