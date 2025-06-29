import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { HospitalRoutes } from '../modules/hospital/hospital.routes';
import { SpecializationRoutes } from '../modules/specialization/specialization.routes';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { AppointmentRoutes } from '../modules/appointment/appointment.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/patient',
    route: PatientRoutes,
  },
  {
    path: '/hospital',
    route: HospitalRoutes,
  },
  {
    path: '/specialization',
    route: SpecializationRoutes,
  },
  {
    path: '/appointments',
    route: AppointmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
