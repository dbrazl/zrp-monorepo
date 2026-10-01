import 'dotenv/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

export class Server {
  public async init(): Promise<void> {
    const app = await NestFactory.create<NestApplication>(AppModule);
    app.setGlobalPrefix('api/v1');
    await app.listen(process.env.PORT ?? 3000);
  }
}
