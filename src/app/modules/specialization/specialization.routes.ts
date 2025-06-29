import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { SpecializationControllers } from './specialization.controllers';
import requestValidation from '../../middlewares/requestValidation';
import { SpecializationValidationSchemas } from './specialization.validatopn.Schema';
import { UserRole } from '../user/user.constant';

// User Router
const specializationRouter = Router();

// Create Specialization
specializationRouter.post(
  '/create',
  auth(UserRole.Admin, UserRole.Doctor),
  requestValidation(SpecializationValidationSchemas.createSpecializationSchema),
  SpecializationControllers.createSpecialization,
);

// Get All Specialization
specializationRouter.get('/', SpecializationControllers.getAllSpecialization);
// Get Single Specialization
specializationRouter.get(
  '/:id',
  SpecializationControllers.getSingleSpecialization,
);

// Export Specialization Router
export const SpecializationRoutes = specializationRouter;
