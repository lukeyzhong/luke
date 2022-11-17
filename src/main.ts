import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // console.log('hello');
  const logger = new Logger();
  const port = 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log('it is listening: ' + `${port}...`);
}
bootstrap();
