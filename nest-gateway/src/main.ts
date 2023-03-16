import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'debug'] });
    await app.listen(3000).then(() => console.log('Api Gateway working'));
}
bootstrap();
