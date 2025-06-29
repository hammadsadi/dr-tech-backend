// models/Availability.ts
import mongoose, { model } from 'mongoose';
import { TAvailability } from './availability.type';

const availabilitySchema = new mongoose.Schema<TAvailability>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: true,
    },
    slots: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

// Export Model
export const Availability = model<TAvailability>(
  'Availability',
  availabilitySchema,
);
