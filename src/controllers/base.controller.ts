import { BaseRepository } from '@repositories/base.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

export type foreignKeyField = 'id_Company' | 'id_Address' | 'id_Employee' | 'id_Project';
export type primaryKeyField = 'idCompany' | 'idAddress' | 'idEmployee' | 'idProject';

@injectable()
export class BaseController<U> {
  constructor(@inject('BaseRepository') private baseRepository: BaseRepository<U>) {}

  async getList(
    request: Request,
    response: Response,
    foreignKeyField: foreignKeyField,
  ): Promise<Response> {
    const list = await this.baseRepository.getRegistersList(
      Number(request.params.id),
      foreignKeyField,
    );
    if (!list) {
      return response.status(400).json({
        status: false,
        message: 'Nenhum registro encontrando!',
      });
    } else {
      list.sort((a, b) => {
        const idA = this.getIdValue(a);
        const idB = this.getIdValue(b);
        if (idA > idB) {
          return -1;
        }
      });
      return response.status(200).json({
        date: new Date(),
        message: 'Lista enviada com sucesso.',
        status: true,
        data: list,
      });
    }
  }

  getIdValue(obj: U): number {
    (['id_Company', 'id_Address', 'id_Employee', 'id_Project'] as Array<keyof U>).forEach(key => {
      if (obj[key] != undefined) {
        return obj[key] as number;
      }
    });
    throw new Error('Nenhuma propriedade de ID encontrada');
  }
}
