import { AddressRepository } from '@repositories/address/address.repository';
import { CompanyRepository } from '@repositories/company/company.respository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AddressController {
  constructor(
    @inject('AddressRepository') private addressRepository: AddressRepository,
    @inject('CompanyRepository') private companyRepository: CompanyRepository,
  ) {}

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
        message: 'Lista enviada com sucesso!',
        data: addressList,
      });
    }
  }

  async addAddress(request: Request, response: Response): Promise<Response> {
    const company = await this.companyRepository.findCompanyByName(request.body[0].name);
    const address = await this.addressRepository.findAddressById(company.idCompany);
    const existingAddress = this.addressRepository.checkRegisterAlreadyExist(address, company);
    if (existingAddress) {
      return response.status(401).json({
        status: false,
        message: 'Endereço já existe para esta empresa',
      });
    } else {
      const registeredAddress = await this.addressRepository.saveAddress(request.body[1]);
      return response.status(200).json({
        status: true,
        message: 'Endereço cadastrado com sucesso!',
        data: registeredAddress,
      });
    }
  }
}
