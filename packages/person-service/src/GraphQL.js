import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import { PersonRepository } from './PersonRepository.js';
import { PersonModel } from './PersonModel.js';

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
    people: {
      type: new GraphQLList(personType),
      resolve: () => personRepository.getAll(),
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPerson: {
      type: personType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_, { name }) => {
        const person = new PersonModel(null, name);
        personRepository.save(person);
        return person;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
