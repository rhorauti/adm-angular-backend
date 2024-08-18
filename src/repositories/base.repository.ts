import { dataSource } from '@migrations/index';
import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';

@injectable()
export class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(entity: new () => T) {
    this.repository = dataSource.getRepository(entity);
  }

  //id_Company
  async getRegistersList(id: number, foreignKeyField: string): Promise<T[]> {
    return await this.repository
      .createQueryBuilder()
      .where(`${foreignKeyField} = id`, { id: id })
      .getMany();
  }

  /**
   * addNewCompany
   * Adiciona uma nova empresa no banco de dados
   * @param companyData Objeto com os dados da empresa que será cadatrado.
   */
  async saveRegister(data: T): Promise<T> {
      return await this.repository.save(data);
  }

  async deleteRegister(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
