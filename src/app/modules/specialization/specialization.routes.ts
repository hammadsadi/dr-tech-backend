import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { SpecializationControllers } from './specialization.controllers';

// User Router
const specializationRouter = Router();

// Create Specialization
specializationRouter.post(
  '/create',

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
