import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { HospitalControllers } from './hospital.controllers';

// User Router
const hospitalRouter = Router();

// Create User
hospitalRouter.post(
  '/create',

  HospitalControllers.createHospital,
);

// Get All Hospital
hospitalRouter.get('/', HospitalControllers.getAllHospital);
// Get Single Hospital
hospitalRouter.get('/:id', HospitalControllers.getSingleHospital);

// Export Hospital Router
export const HospitalRoutes = hospitalRouter;
