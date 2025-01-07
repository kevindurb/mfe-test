import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { schema } from './GraphQL.js';
import cors from 'cors';

export const server = new ApolloServer({
  schema,
});

await server.start();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

app.listen(8002, () => console.log('listening!'));
