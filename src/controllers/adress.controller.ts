import { AddressRepository } from '@repositories/adress.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AddressController {
  constructor(@inject('AddressRepository') private addressRepository: AddressRepository) {}

  async getAddressList(request: Request, response: Response): Promise<Response> {
    const addressList = await this.addressRepository.getAllAdressRegisters(request.body.idCompany);
    if (!addressList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum endereço encontrado!',
      });
    } else {
      addressList.sort((a, b) => {
        a.idAddress > b.idAddress;
        return -1;
      });
      return response.status(200).json({
        date: new Date(),
        status: true,
        message: 'Dados enviados com sucesso.',
        data: addressList,
      });
    }
  }
}
