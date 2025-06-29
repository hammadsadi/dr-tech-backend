import { model, Schema } from 'mongoose';
import { TAppointment } from './appointment.type';

const appointmentSchema = new Schema<TAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Export Model
export const Appointment = model<TAppointment>(
  'Appointment',
  appointmentSchema,
);
