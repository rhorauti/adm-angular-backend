import { AddressRepository } from '@repositories/address/address.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AddressController {
  constructor(@inject('AddressRepository') private addressRepository: AddressRepository) {}

  async getAddressList(response: Response): Promise<Response> {
    const addressList = await this.addressRepository.getAllAddresses();
    if (!addressList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhuma lista de endereços encontrada',
      });
    } else {
      addressList.sort((a, b) => {
        if (a.idAddress > b.idAddress) return -1;
      });
      return response.status(200).json({
        status: true,
        message: 'Lista recebida com sucesso!',
        data: addressList,
      });
    }
  }
}
