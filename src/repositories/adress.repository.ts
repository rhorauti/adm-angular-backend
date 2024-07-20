import { dataSource } from '@migrations/index';
import { Address } from '@models/adress/address';

export class AddressRepository {
  private adressRepository = dataSource.getRepository(Address);

  async getAdressList(companyId: number): Promise<Address[]> {
    return await this.adressRepository
      .createQueryBuilder('address')
      .where('adress.id_Company = companyId', { companyId: companyId })
      .getMany();
  }
}
