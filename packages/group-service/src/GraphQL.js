import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

import { gql } from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { GroupRepository } from './GroupRepository.js';
import { GroupModel } from './GroupModel.js';
import { PersonRef } from './PersonRef.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const groupRepository = new GroupRepository();

const resolvers = {
  Query: {
    group: (_, { id }) => groupRepository.getOne(id),
    groups: () => groupRepository.getAll(),
  },
  Mutation: {
    createGroup: (_, { name }) => {
      const group = new GroupModel(null, name);
      groupRepository.save(group);
      return group;
    },
    addMemberToGroup: (_, { personId, groupId }) => {
      const group = groupRepository.getOne(groupId);
      if (!group) throw new Error('Group Not Found');

      groupRepository.addMemberToGroup(group, personId);
      return groupRepository.getOne(group.id);
    },
  },
  Person: {
    groups: ({ id: personId }) => {
      return groupRepository.getGroupsforPerson(personId);
    },
  },
  Group: {
    members: ({ id: groupId }) => {
      const group = groupRepository.getOne(groupId);
      if (!group) throw new Error('Group Not Found');

      return groupRepository.getPeopleInGroup(group);
    },
  },
};

export const schema = buildSubgraphSchema({
  typeDefs: gql(await readFile(join(__dirname, './schema.gql'), 'utf-8')),
  resolvers,
});
