import 'reflect-metadata';
import 'dotenv/config';

import { setup } from './app';

import '@shared/container';

async function start(): Promise<void> {
  const app = await setup();

  const port = Number(process.env.PORT) || 3333;
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`Server started on port ${port}!`);
}

start();
