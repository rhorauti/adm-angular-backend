import { Router } from 'express';
import { authRoute } from './auth/auth.route';
import { companyRoute } from './company/company.route';
import { addressRoute } from './address/address.route';
import { employeeRoute } from './employee/employee.route';

const router = Router();
router.use(authRoute);
router.use(companyRoute);
router.use(addressRoute);
router.use(employeeRoute);

export { router };
