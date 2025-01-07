import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  extendSchema,
  parse,
} from 'graphql';
import { GroupRepository } from './GroupRepository.js';
import { GroupModel } from './GroupModel.js';

const groupRepository = new GroupRepository();

const groupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    members: {
      type: new GraphQLList(GraphQLID),
      resolve: (group) => groupRepository.getMemberIds(group),
    },
  },
});

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    groups: {
      type: new GraphQLList(groupType),
      resolve: () => [],
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    group: {
      type: groupType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, { id }) => groupRepository.getOne(id),
    },
    groups: {
      type: new GraphQLList(groupType),
      resolve: () => groupRepository.getAll(),
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createGroup: {
      type: groupType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_, { name }) => {
        const group = new GroupModel(null, name);
        groupRepository.save(group);
        return group;
      },
    },
    addMemberToGroup: {
      type: groupType,
      args: {
        groupId: { type: GraphQLID },
        personId: { type: GraphQLID },
      },
      resolve: (_, { groupId, personId }) => {
        const group = groupRepository.getOne(groupId);
        if (!group) throw new Error('Group Not Found');

        groupRepository.addMemberToGroup(group, personId);
        return groupRepository.getOne(group.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: [personType],
});
