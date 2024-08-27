import { BaseController } from '@controllers/base/base.register.controller';
import { Employee } from '@models/employee/employee';
import Router from 'express';
import { container } from 'tsyringe';

const employeeRoute = Router();
const version = 'v1';

const employeeController = container.resolve<BaseController>('BaseController<Employee>');

employeeRoute.get(`/${version}/employee/:id`, (request, response) => {
  employeeController.getList(request, response, 'id_Employee');
});
