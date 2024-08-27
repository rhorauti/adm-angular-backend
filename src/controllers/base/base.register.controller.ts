// import { AllEntities } from '@core/interfaces/IBase';
// import { BaseRepository } from '@repositories/base/base.repository';
// import { Request, Response } from 'express';
// import { inject, injectable } from 'tsyringe';

// export type foreignKeyField = 'id_Company' | 'id_Address' | 'id_Employee' | 'id_Project';
// export type primaryKeyField = 'idCompany' | 'idAddress' | 'idEmployee' | 'idProject';

// @injectable()
export class BaseController {
  // constructor(@inject('BaseRepository') private baseRepository: BaseRepository<AllEntities>) {}
  // async getList(
  //   request: Request,
  //   response: Response,
  //   foreignKeyField: foreignKeyField,
  // ): Promise<Response> {
  //   const list = await this.baseRepository.getList(Number(request.params.id), foreignKeyField);
  //   if (!list) {
  //     return response.status(400).json({
  //       status: false,
  //       message: 'Nenhum registro encontrando!',
  //     });
  //   } else {
  //     list.sort((a, b) => {
  //       const idA = this.getIdValue(a);
  //       const idB = this.getIdValue(b);
  //       if (idA > idB) {
  //         return -1;
  //       }
  //     });
  //     return response.status(200).json({
  //       date: new Date(),
  //       message: 'Lista enviada com sucesso.',
  //       status: true,
  //       data: list,
  //     });
  //   }
  // }
  // getIdValue(obj: AllEntities): number {
  //   (['id_Company', 'id_Address', 'id_Employee', 'id_Project'] as Array<keyof AllEntities>).forEach(
  //     key => {
  //       if (obj[key] != undefined) {
  //         return obj[key] as number;
  //       }
  //     },
  //   );
  //   throw new Error('Nenhuma propriedade de ID encontrada');
  // }
  // async addNewRegister(request: Request, response: Response): Promise<Response> {
  //   const register = await this.baseRepository.findByField(fieldName, request.body);
  //   if (register) {
  //     return response.status(422).json({
  //       status: false,
  //       message: `Empresa ${register.name} já existe!`,
  //     });
  //   } else {
  //     const register = await this.baseRepository.saveRegister(request.body);
  //     if (!register) {
  //       return response.status(500).json({
  //         status: false,
  //         message: 'Erro interno do servidor!',
  //       });
  //     } else {
  //       return response.status(200).json({
  //         status: true,
  //         message: `Empresa ${register.name} registrada com sucesso!`,
  //         data: register,
  //       });
  //     }
  //   }
  // }
}
