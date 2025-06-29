import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { UserRole } from '../user/user.constant';
import { AppointmentController } from './appointment.controllers';
import requestValidation from '../../middlewares/requestValidation';
import { AppointmentValidationSchema } from './appointment.validation.schema';

// Appointment Router
const appointmentRouter = Router();

// Create Appointment
appointmentRouter.post(
  '/',
  auth(UserRole.Patient),
  requestValidation(AppointmentValidationSchema.createAppointmentZodSchema),
  AppointmentController.createBooking,
);

// Export Appointment Router
export const AppointmentRoutes = appointmentRouter;
