// patient.routes.ts
import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { UserRole } from '../user/user.constant';
import { PatientControllers } from './patient.controllers';

const patientRouter = Router();

// Public routes
patientRouter.post('/register-patient', PatientControllers.createPatient);

// Protected routes
patientRouter.get(
  '/profile',
  auth(UserRole.Patient),
  PatientControllers.getPatientProfile,
);
// Get Patient Appointment
patientRouter.get(
  '/appointment',
  auth(UserRole.Patient),
  PatientControllers.getLoggedInUSerAppointment,
);

export const PatientRoutes = patientRouter;
