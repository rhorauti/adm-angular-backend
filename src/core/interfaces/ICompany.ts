export interface ICompanyDTO {
  id: number;
  type: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  adress: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
}

export interface ICompanyDTOExtended extends ICompanyDTO {
  id: number;
}

export interface IResponseCompany {
  date: string;
  status: boolean;
  message: string;
  data: ICompanyDTO[];
}
