export interface ICompanyDTO {
  idCompany: number;
  type: number;
  date: string;
  nickname: string;
  name: string;
  cnpj: string;
}

export interface ITypeDTO {
  idCompanyType: number;
  type: number;
}

// export interface ICompanyDTOExtended extends ICompanyDTO {
//   idCompany: number;
// }

export interface IResponseCompany {
  date: string;
  status: boolean;
  message: string;
  data: ICompanyDTO[];
}
