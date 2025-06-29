import { Types } from 'mongoose';

export type TAppointment = {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  serviceId: Types.ObjectId;
  selectedDate: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
};
export type TPopulatedAppointment = TAppointment & {
  doctorId: { name: string };
  patientId: { name: string; email: string };
  serviceId: { title: string };
};
