import { dataSource } from '@migrations/index';
import { Employee } from '@models/employee/employee';

export class EmployeeRepository {
  private employeeRepository = dataSource.getRepository(Employee);

  async getEmployeeList(companyId: number): Promise<Employee[]> {
    return await this.employeeRepository
      .createQueryBuilder()
      .select('employee')
      .where('employee.id_Company = companyId', { companyId: companyId })
      .getMany();
  }
}
