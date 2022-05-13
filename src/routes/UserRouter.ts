import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../repositories/UserRepository';

export default (fastify: FastifyInstance, options: RouteShorthandOptions, next: any) => {
  const userRepository = new UserRepository(fastify);
  const userController = new UserController(userRepository);
  fastify.get('/users', userController.index);
  next();
}
