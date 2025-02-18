import { AddressController } from '@controllers/address/address.controller';
import Router from 'express';
import { container } from 'tsyringe';

const addressRoute = Router();
const version = 'v1';

const addressController = container.resolve(AddressController);

addressRoute.get(`/${version}/address`, (request, response, next) => {
  addressController.getAddressList(response);
});

addressRoute.post(`/${version}/address`, (request, response, next) => {
  addressController.saveAddress(request, response, next);
});

addressRoute.delete(`/${version}/address/:idAddress`, (request, response, next) => {
  addressController.deleteAddress(request, response, next);
});

export { addressRoute };
