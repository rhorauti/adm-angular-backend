import { AddressRepository } from '@repositories/address/address.repository';
import { CompanyRepository } from '@repositories/company/company.respository';
import { CustomError } from '@src/middlewares/error';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
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
        msg: 'Nenhuma lista de endereços encontrada',
      });
    } else {
      addressList.sort((a, b) => {
        if (a.idAddress > b.idAddress) return -1;
      });
      return response.status(200).json({
        status: true,
        msg: 'Lista enviada com sucesso!',
        data: addressList,
      });
    }
  }

  async checkNicknameExist(request: Request, response: Response, next: NextFunction) {
    try {
      const response = await this.addressRepository.getAllAddresses();
      if (response) {
        response.forEach(address => {
          if (
            address.idAddress != request.body.idAddress &&
            address.nickname == request.body.nickname
          ) {
            const error = new Error('Já existe esse apelido!') as CustomError;
            error.statusCode = 400;
            next(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveAddress(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      this.checkNicknameExist(request, response, next);
      const existingAddress = await this.addressRepository.checkRegisterAlreadyExist(request.body);
      if (existingAddress) {
        return response.status(401).json({
          status: false,
          msg: 'Endereço já existe para esta empresa',
        });
      } else {
        const registeredAddress = await this.addressRepository.saveAddress(request.body);
        return response.status(200).json({
          status: true,
          msg: 'Endereço cadastrado com sucesso!',
          data: registeredAddress,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const idAddress = Number(request.params.idAddress);
      const address = await this.addressRepository.findAddressById(idAddress);
      console.log('address', address);
      await this.addressRepository.deleteAddress(idAddress);
      return response.status(200).json({
        status: true,
        msg: `Empresa ${address.nickname} excluida com sucesso!`,
      });
    } catch (error) {
      next(error);
    }
  }
}
