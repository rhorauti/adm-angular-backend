import { dataSource } from '@migrations/index';
import { Address } from '@models/adress/address';

export class AddressRepository {
  private adressRepository = dataSource.getRepository(Address);

  /**
   * getAllAdressRegisters
   *
   * get list of registeres from database according to companies type (customer, suppliers, my company)
   * @param companyId number.
   * @returns Promise<Adress[]>
   */
  async getAllAdressRegisters(companyId: number): Promise<Address[]> {
    return await this.adressRepository
      .createQueryBuilder('address')
      .where('adress.id_Company = companyId', { companyId: companyId })
      .getMany();
  }
}
