import { AddressController } from '@controllers/address/address.controller';
import Router from 'express';
import { container } from 'tsyringe';

const addressRoute = Router();
const version = 'v1';

const addressController = container.resolve(AddressController);

addressRoute.get(`/${version}/address`, (request, response) => {
  addressController.getAddressList(response);
});

addressRoute.post(`/${version}/address`, (request, response) => {
  addressController.addAddress(request, response);
});

export { addressRoute };
