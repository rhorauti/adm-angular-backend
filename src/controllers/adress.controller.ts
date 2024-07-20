import { AddressRepository } from '@repositories/adress.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AddressController {
  constructor(@inject('AddressRepository') private addressRepository: AddressRepository) {}

  async getAddressList(request: Request, response: Response): Promise<Response> {
    const addressList = await this.addressRepository.getAdressList(request.body.idCompany);
    if (!addressList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum endereço encontrado!',
      });
    } else {
      return;
    }
  }
}
