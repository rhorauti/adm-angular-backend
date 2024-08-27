import { Router } from 'express';
import { authRoute } from './auth/auth.route';
import { companyRoute } from './company/company.route';

const router = Router();
router.use(authRoute);
router.use(companyRoute);

export { router };
