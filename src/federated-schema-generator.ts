import { INestApplication } from '@nestjs/common';
import { normalizeTypeDefs } from '@apollo/federation';
import { printWithComments } from '@graphql-tools/utils';
import { parse } from 'graphql';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as request from 'supertest';

const GRAPHQL_SDL_FILE_HEADER =
  '# ------------------------------------------------------\n# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)\n# ------------------------------------------------------\n\n';

export async function generateFederatedSchema(app: INestApplication) {
  await app.init();

  const { body } = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: `
        query {
          _service {
             sdl
          }
        }
      `,
    });

  const typeDefs = parse(body.data._service.sdl);

  const filePath = join(process.cwd(), 'src/schema.federated.gql');
  const fileContent =
    GRAPHQL_SDL_FILE_HEADER + printWithComments(normalizeTypeDefs(typeDefs));

  await fs.writeFile(filePath, fileContent, { encoding: 'utf8' });
  console.log(`Federated schema generated ${filePath}`);
}
