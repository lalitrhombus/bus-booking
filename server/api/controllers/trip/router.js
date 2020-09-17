import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/:id/status', controller.details)
  .get('/:id', controller.byId)
  .put('/:id', controller.update)
  .post('/', controller.create);
