import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

import { gql } from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { PersonRepository } from './PersonRepository.js';
import { PersonModel } from './PersonModel.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const personRepository = new PersonRepository();

const resolvers = {
  Query: {
    person: (_, { id }) => personRepository.getOne(id),
    people: () => personRepository.getAll(),
  },
  Mutation: {
    createPerson: (_, { name }) => {
      const person = new PersonModel(null, name);
      personRepository.save(person);
      return person;
    },
  },
  Person: {
    __resolveReference: ({ id }) => personRepository.getOne(id),
  },
};

export const schema = buildSubgraphSchema({
  typeDefs: gql(await readFile(join(__dirname, './schema.gql'), 'utf-8')),
  resolvers,
});
