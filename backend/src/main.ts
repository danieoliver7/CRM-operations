import 'reflect-metadata';
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? process.env.BACKEND_PORT ?? 4000);
  const host = process.env.BACKEND_HOST ?? '0.0.0.0';

  await app.listen(port, host);
  console.log(`CRM Operations backend skeleton listening on http://${host}:${port}`);
}

void bootstrap();
