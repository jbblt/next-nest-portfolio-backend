import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

const port = process.env.PORT ?? 8080;

async function bootstrap() {
  const port = process.env.PORT ?? 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
void bootstrap().then(() => console.log('Server started on port ', port));
