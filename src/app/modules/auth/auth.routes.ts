import { Router } from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { AuthControllers } from './auth.controllers';
import auth from '../../middlewares/authChecking';
import { UserRole } from '../user/user.constant';
import { DoctorControllers } from '../doctor/doctor.controllers';
import { DoctorValidation } from '../doctor/doctor.validation.schema';

// User Router
const authRouter = Router();

// Create User
authRouter.post(
  '/login',

  AuthControllers.userLogin,
);

// Create Doctor
authRouter.post(
  '/register-doctor',
  requestValidation(DoctorValidation.createDoctorValidationSchema),
  DoctorControllers.createDoctor,
);

// LoggedIn User
authRouter.get('/me', AuthControllers.loggedInUser);

// Export User Router
export const AuthRoutes = authRouter;
