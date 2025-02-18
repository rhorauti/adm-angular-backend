import { EmployeeController } from '@controllers/employee/employee.controller';
import Router from 'express';
import { container } from 'tsyringe';

const employeeRoute = Router();
const version = 'v1';

const employeeController = container.resolve(EmployeeController);

employeeRoute.get(`/${version}/employee`, (request, response) => {
  employeeController.getEmployeeList(request, response);
});

employeeRoute.post(`/${version}/employee`, (request, response, next) => {
  employeeController.saveEmployee(request, response, next);
});

employeeRoute.delete(`/${version}/employee/:idEmployee`, (request, response, next) => {
  employeeController.deleteEmployee(request, response, next);
});

export { employeeRoute };
