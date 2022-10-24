import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule/*, { abortOnError: false }*/);

  console.log('Connected to Postgres');
  await app.listen(3000, ()=> console.log('Server started'));
}
bootstrap();
