import { dataSource } from '@migrations/index';
import { ICompanyDTO, ICompanyDTOExtended } from '../core/interfaces/ICompany';
import { Company } from '@models/company';

export class CompanyRepository {
  private companyRepository = dataSource.getRepository(Company);

  async findCompanyByName(name: string, type: number): Promise<Company> {
    return await this.companyRepository.findOne({
      where: {
        name: name,
        type: type,
      },
    });
  }

  async findCompanyById(id: number): Promise<Company> {
    return await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getCompanyList(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  /**
   * addNewCompany
   * Adiciona uma nova empresa no banco de dados
   * @param companyData Objeto com os dados da empresa que será cadatrado.
   */
  async addNewCompany(companyData: ICompanyDTO): Promise<Company> {
    if (companyData.id) {
      delete companyData.id;
    }
    const newCompany = this.companyRepository.create(companyData);
    return this.companyRepository.save(newCompany);
  }

  async updateCompany(companyData: ICompanyDTOExtended, companyId: string): Promise<void> {
    await this.companyRepository
      .createQueryBuilder()
      .update(Company)
      .set(companyData)
      .where('id = :id', { id: companyId })
      .execute();
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyRepository
      .createQueryBuilder()
      .delete()
      .from(Company)
      .where('id = :id', { id: companyId })
      .execute();
  }
}
