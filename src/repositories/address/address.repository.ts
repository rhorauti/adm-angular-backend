import { IAddress } from '@core/interfaces/IAddress';
import { dataSource } from '@migrations/index';
import { Address } from '@models/adress/address';
import { injectable } from 'tsyringe';

@injectable()
export class AddressRepository {
  private addressRepository = dataSource.getRepository(Address);

  async getAllAddresses(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async findAddressById(id: number): Promise<Address> {
    return await this.addressRepository.findOne({
      where: { idAddress: id },
    });
  }

  async saveAddress(data: IAddress): Promise<Address> {
    return await this.addressRepository.save(data);
  }

  async deleteAddress(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
