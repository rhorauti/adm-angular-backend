import { EmployeeRepository } from '@repositories/employee/employee.repository';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class EmployeeController {
  constructor(@inject('EmployeeRepository') private employeeRepository: EmployeeRepository) {}

  async getEmployeeList(request: Request, response: Response): Promise<Response> {
    const employeeList = await this.employeeRepository.getAllEmployees();
    if (!employeeList) {
      return response.status(400).json({
        status: false,
        message: 'Nenhuma lista de funcionários encontrada',
      });
    } else {
      employeeList.sort((a, b) => {
        if (a.idEmployee > b.idEmployee) return -1;
      });
      response.status(200).json({
        status: true,
        message: 'Lista recebida com sucesso!',
        data: employeeList,
      });
    }
  }
}
