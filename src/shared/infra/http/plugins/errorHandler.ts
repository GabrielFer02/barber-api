import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import AppError from '@shared/errors/AppError';

export async function errorHandler(app: FastifyInstance): Promise<void> {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({
        status: 'error',
        message: error.message,
      });
      return reply;
    }

    if (error instanceof ZodError) {
      reply.status(400).send({
        status: 'error',
        message: 'Validation failed',
        issues: error.flatten().fieldErrors,
      });
      return reply;
    }

    console.error(error);

    reply.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
    return reply;
  });
}
