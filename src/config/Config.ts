import { FastifyInstance } from 'fastify';
import fs from 'fs';
import { PluginEntity } from '../entities/PluginEntity';

namespace Config {

  export async function routes(fastify: FastifyInstance, path: string, prefix: string) {
    const files = fs.readdirSync(`${path}`);

    for (const file of files) {
      if (file.endsWith('.ts')) {
        const route = require(`${path}/${file}`);
        fastify.register(route, { prefix });
      }
    }
  }

  export async function plugins(fastify: FastifyInstance, plugins: PluginEntity[]) {
    for (const plugin of plugins) {
      fastify.register(require(plugin.name), plugin.options);
    }
    await fastify.after();
  }
}

export { Config };
