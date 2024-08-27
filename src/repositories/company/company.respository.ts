import { dataSource } from '@migrations/index';
import { ICompanyDTO, ITypeDTO } from '../../core/interfaces/ICompany';
import { Company } from '@models/company/company';
import { CompanyType } from '@models/company/companyType';

export class CompanyRepository {
  private companyRepository = dataSource.getRepository(Company);
  private companyTypeRepository = dataSource.getRepository(CompanyType);

  async getAllCompanyRegisters(companyType: number): Promise<Company[]> {
    return await this.companyRepository
      .createQueryBuilder('company')
      .innerJoin('company.companyType', 'companyType')
      .select([
        'company.idCompany',
        'company.date',
        'company.nickname',
        'company.name',
        'company.cnpj',
      ])
      .where('companyType.type = :type', { type: companyType })
      .getMany();
  }

  async findCompanyByName(name: string, type: number): Promise<Company> {
    const companyList = await this.getAllCompanyRegisters(type);
    return companyList.find(company => company.name == name);
  }

  async findCompanyById(id: number, type: number): Promise<Company> {
    const companyList = await this.getAllCompanyRegisters(type);
    return companyList.find(company => company.idCompany == id);
  }

  async findCompanyTypeById(id: number): Promise<CompanyType> {
    return await this.companyTypeRepository
      .createQueryBuilder('companyType')
      .where('companyType.id_Company = idCompany', { idCompany: id })
      .getOne();
  }

  /**
   * addNewCompany
   * Adiciona uma nova empresa no banco de dados
   * @param companyData Objeto com os dados da empresa que será cadatrado.
   */
  async saveCompany(data: ICompanyDTO): Promise<Company> {
    return await this.companyRepository.save(data);
  }

  async saveCompanyType(data: ITypeDTO): Promise<CompanyType> {
    return await this.companyTypeRepository.save(data);
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyRepository.delete(companyId);
  }
}
