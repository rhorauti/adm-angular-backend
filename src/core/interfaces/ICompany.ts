export interface ICompanyDTO {
  id: number;
  tipo: number;
  cadastro: string;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
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
