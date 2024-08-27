export interface ICompanyDTO {
  idCompany: number;
  date: string;
  nickname: string;
  name: string;
  cnpj: string;
}

export interface ITypeDTO {
  idCompanyType: number;
  type: number;
  id_Company: number;
}

export interface IResponseCompany {
  date: string;
  status: boolean;
  message: string;
  data: ICompanyDTO[];
}
