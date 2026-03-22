import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import Redis from 'ioredis';

import uploadConfig from '@config/upload';
import cacheConfig from '@config/cache';
import { errorHandler } from './plugins/errorHandler';
import { ensureAuthenticated } from './plugins/ensureAuthenticated';
import { routes } from './routes';

const app = Fastify({ logger: false });

async function setup(): Promise<typeof app> {
  await app.register(cors);

  await app.register(fastifyStatic, {
    root: uploadConfig.uploadsFolder,
    prefix: '/files/',
  });

  await app.register(multipart);

  const redis = new Redis(cacheConfig.config.redis);
  await app.register(rateLimit, {
    max: 100,
    timeWindow: 1000,
    redis,
  });

  await app.register(ensureAuthenticated);
  await app.register(errorHandler);
  await app.register(routes);

  return app;
}

export { app, setup };
