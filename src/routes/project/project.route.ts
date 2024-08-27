import { BaseController } from '@controllers/base/base.register.controller';
import Router from 'express';
import { container } from 'tsyringe';

const projectRoute = Router();
const version = 'v1';

const projectController = container.resolve<BaseController>('BaseController<Project>');

projectRoute.get(`/${version}/address/:id`, (request, response) => {
  projectController.getList(request, response, 'id_Address');
});

export { projectRoute };
