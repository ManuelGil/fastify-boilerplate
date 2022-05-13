import { FastifyInstance } from 'fastify';

export class AbstractRepository {
  constructor(protected fastify: FastifyInstance) {}
}
