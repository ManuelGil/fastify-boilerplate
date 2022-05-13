import { FastifyInstance } from "fastify";
import { AbstractRepository } from "./Repository";

export class UserRepository extends AbstractRepository {
  constructor(fastify: FastifyInstance) {
    super(fastify);
  }
}
