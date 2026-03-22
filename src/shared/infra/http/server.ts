import 'reflect-metadata';
import 'dotenv/config';

import { setup } from './app';

import '@shared/container';

async function start(): Promise<void> {
  const app = await setup();

  await app.listen({ port: 3333, host: '0.0.0.0' });
  console.log('Server started on port 3333!');
}

start();
