import { EmployeeController } from '@controllers/employee/employee.controller';
import Router from 'express';
import { container } from 'tsyringe';

const employeeRoute = Router();
const version = 'v1';

const employeeController = container.resolve(EmployeeController);

employeeRoute.get(`/${version}/employee`, (request, response) => {
  employeeController.getEmployeeList(request, response);
});

export { employeeRoute };
