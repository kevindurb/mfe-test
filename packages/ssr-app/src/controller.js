import { Router } from 'express';

export const controller = Router();

controller.get('/', (req, res) => {
  res.render('index');
});
