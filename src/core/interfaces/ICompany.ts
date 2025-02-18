export interface ICompanyDTO {
  idCompany: number;
  type: number;
  nickname: string;
  name: string;
  cnpj?: string;
  ie?: string;
  im?: string;
}

export interface IResponseCompany {
  date: string;
  status: boolean;
  message: string;
  data: ICompanyDTO[];
}
