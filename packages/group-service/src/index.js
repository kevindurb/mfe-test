import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './GraphQL.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.all('/graphql', createHandler({ schema }));

app.listen(8002, () => console.log('listening!'));
