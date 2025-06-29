import { Router } from 'express';
import auth from '../../middlewares/authChecking';
import { DoctorControllers } from './doctor.controllers';
import { UserRole } from '../user/user.constant';
import { ServiceControllers } from '../service/service.controllers';
import { AvailabilityController } from '../availability/availability.controllers';
import requestValidation from '../../middlewares/requestValidation';
import { ServiceValidationSchemas } from '../service/services.validation.schema';
import { AvailabilityValidationSchema } from '../availability/availability.validation.schema';
import { AppointmentController } from '../appointment/appointment.controllers';

// Doctor Router
const doctorRouter = Router();

// Create Services
doctorRouter.post(
  '/services',
  requestValidation(ServiceValidationSchemas.createServiceValidationSchema),
  auth(UserRole.Doctor),
  ServiceControllers.createService,
);

// Create Availability
doctorRouter.post(
  '/availability',
  auth(UserRole.Doctor),
  requestValidation(AvailabilityValidationSchema.createAvailabilitySchema),
  AvailabilityController.createAvailability,
);

// Get All Services
doctorRouter.get(
  '/services',
  auth(UserRole.Doctor),
  ServiceControllers.getAllService,
);
// Get All Availability
doctorRouter.get(
  '/availability',
  auth(UserRole.Doctor),
  AvailabilityController.getAllAvailability,
);

// Get Logged In Doctor Appointments
doctorRouter.get(
  '/appointments',
  auth(UserRole.Doctor),
  DoctorControllers.getAllLoggedINDoctor,
);

// Update Appointment
doctorRouter.patch(
  '/appointments/:id',
  auth(UserRole.Doctor),
  AppointmentController.updateBooking,
);

// Update Availability
doctorRouter.patch(
  '/availability/:id',
  auth(UserRole.Doctor),
  requestValidation(AvailabilityValidationSchema.updateAvailabilitySchema),
  AvailabilityController.updateAvailability,
);

// Update Services
doctorRouter.patch(
  '/services/:id',
  requestValidation(ServiceValidationSchemas.updateServiceValidationSchema),
  auth(UserRole.Doctor),
  ServiceControllers.updateService,
);

// Delete Services
doctorRouter.delete(
  '/services/:id',
  auth(UserRole.Doctor),
  ServiceControllers.deleteService,
);

// Get All Doctor
doctorRouter.get('/', DoctorControllers.getAllDoctor);

// Get Doctor Profile
doctorRouter.get(
  '/:id',
  auth(UserRole.Doctor, UserRole.Patient, UserRole.Admin),
  DoctorControllers.getDoctorProfile,
);
// Export Doctor Router
export const DoctorRoutes = doctorRouter;
