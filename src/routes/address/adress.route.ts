import { BaseController } from '@controllers/base/base.register.controller';
import Router from 'express';
import { container } from 'tsyringe';

const addressRoute = Router();
const version = 'v1';

const addressController = container.resolve<BaseController>('BaseController<Address>');

addressRoute.get(`/${version}/address/:id`, (request, response) => {
  addressController.getList(request, response, 'id_Address');
});

export { addressRoute };
