import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './GraphQL.js';

const app = express();

app.all('/graphql', createHandler({ schema }));

app.listen(8001, () => console.log('listening!'));
