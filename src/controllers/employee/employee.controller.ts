import { EmployeeRepository } from '@repositories/employee/employee.repository';
import { CustomError } from '@src/middlewares/error';
import { NextFunction, Request, Response } from 'express';
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

  async saveEmployee(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const employees = await this.employeeRepository.getAllEmployees();
      const duplicate = employees.find(
        employee =>
          employee.idEmployee !== request.body.idEmployee && employee.name == request.body.name,
      );
      if (duplicate) {
        const error = new Error('Já existe esse nome em outro registro!') as CustomError;
        error.statusCode = 400;
        next(error);
      } else {
        const registeredEmployee = await this.employeeRepository.saveEmployee(request.body);
        return response.status(200).json({
          status: true,
          msg: 'Funcionário cadastrado com sucesso!',
          data: registeredEmployee,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const idEmployee = Number(request.params.idEmployee);
      const employee = await this.employeeRepository.findEmployeeById(idEmployee);
      console.log('address', employee);
      await this.employeeRepository.deleteEmployee(idEmployee);
      return response.status(200).json({
        status: true,
        msg: `Empresa ${employee.name} excluida com sucesso!`,
      });
    } catch (error) {
      next(error);
    }
  }
}
