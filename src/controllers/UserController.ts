import { FastifyReply, FastifyRequest } from 'fastify';
import { AbstractRepository } from '../repositories/Repository';

export class UserController {

  constructor(protected repository: AbstractRepository) { }

  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Jack Doe' },
      ];
      return reply.send(users);
    } catch (err) {
      return reply.send(err);
    }
  }
}

