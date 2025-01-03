import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import { PersonRepository } from './PersonRepository.js';

const personRepository = new PersonRepository();

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    person: {
      type: personType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, { id }) => personRepository.getOne(id),
    },
  },
});

export const schema = new GraphQLSchema({ query: queryType });
