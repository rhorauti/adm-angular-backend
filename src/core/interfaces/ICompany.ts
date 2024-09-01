export interface ICompanyDTO {
  idCompany: number;
  date: string;
  type: number;
  nickname: string;
  name: string;
  cnpj: string;
  ie: string;
  im: string;
}

export interface IResponseCompany {
  date: string;
  status: boolean;
  message: string;
  data: ICompanyDTO[];
}
