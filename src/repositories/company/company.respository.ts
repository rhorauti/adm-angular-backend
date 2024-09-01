import { dataSource } from '@migrations/index';
import { ICompanyDTO } from '../../core/interfaces/ICompany';
import { Company } from '@models/company/company';

export class CompanyRepository {
  private companyRepository = dataSource.getRepository(Company);

  async getAllCompanies(companyType: number): Promise<Company[]> {
    return await this.companyRepository
      .createQueryBuilder('company')
      .where('company.type = :type', { type: companyType })
      .getMany();
  }

  async findCompanyById(id: number): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { idCompany: id },
    });
  }

  /**
   * addNewCompany
   * Adiciona uma nova empresa no banco de dados
   * @param companyData Objeto com os dados da empresa que será cadatrado.
   */
  async saveCompany(data: ICompanyDTO): Promise<Company> {
    return await this.companyRepository.save(data);
  }

  async deleteCompany(company: Company): Promise<void> {
    await this.companyRepository.delete(company);
  }
}
