import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import { Config } from './config/Config';
import { PluginEntity } from './entities/PluginEntity';

dotenv.config();

const server: FastifyInstance = fastify({
  logger: {
    prettyPrint: true
  }
});

const PATH: string = path.join(__dirname, 'routes');

Config.routes(server, PATH, '/api');

const plugins: PluginEntity[] = [
  {
    name: '@fastify/cors',
    options: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      credentials: true,
    }
  },
  {
    name: '@fastify/jwt',
    options: {
      secret: process.env.JWT_SECRET,
      sign: {
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    }
  }
];

Config.plugins(server, plugins);

const PORT: string | number = process.env.PORT || 3000;

const start = async () => {
  try {
    await server.ready();
    await server.listen(PORT);

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    server.log.info(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
