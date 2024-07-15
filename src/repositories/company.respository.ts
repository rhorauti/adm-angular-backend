import { dataSource } from '@migrations/index';
import { ICompanyDTO, ITypeDTO } from '../core/interfaces/ICompany';
import { Company } from '@models/company/company';
import { CompanyType } from '@models/company/companyType';

export class CompanyRepository {
  private companyRepository = dataSource.getRepository(Company);
  private companyTypeRepository = dataSource.getRepository(CompanyType);

  async getCompanyList(companyType: number): Promise<Company[]> {
    return await this.companyRepository
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.companyType', 'companyType')
      .where('companyType.idCompanyType = :companyTypeId', { companyTypeId: companyType })
      .getMany();
    }

    // async getCompanyList(idCompanyType: number): Promise<Company[]> {
  //   return await this.companyRepository
  //     .createQueryBuilder('company')
  //     .select([
  //       'company.idCompany',
  //       'company.date',
  //       'company.nickname',
  //       'company.name',
  //       'company.cnpj',
  //       'companyType.name',
  //     ])
  //     .innerJoinAndSelect('company.companyType', 'companyType')
  //     .where('companyType.id_Company = :idType', { idType: idCompanyType })
  //     .getMany();
  // }

  async findCompanyByName(name: string, type: number): Promise<Company> {
    const companyList = await this.getCompanyList(type);
    return companyList.find(company => company.name == name);
  }

  async findCompanyById(id: number, type: number): Promise<Company> {
    const companyList = await this.getCompanyList(type);
    return companyList.find(company => company.idCompany == id);
    // return await this.companyRepository.findOne({
    //   where: {
    //     idCompany: id,
    //     type: type,
    //   },
    // });
  }

  /**
   * addNewCompany
   * Adiciona uma nova empresa no banco de dados
   * @param companyData Objeto com os dados da empresa que será cadatrado.
   */
  async saveCompany(data: ICompanyDTO | ITypeDTO): Promise<Company | CompanyType> {
    if ('idCompany' in data) {
      return await this.companyRepository.save(data);
    } else {
      return await this.companyTypeRepository.save(data);
    }
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyRepository.delete(companyId);
  }
}
