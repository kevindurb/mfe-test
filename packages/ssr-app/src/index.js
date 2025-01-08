import bodyParser from 'body-parser';
import express from 'express';
import { controller } from './controller.js';

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controller);
app.listen(3004, () => console.log('listening!'));
