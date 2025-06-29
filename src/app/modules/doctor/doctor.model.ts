/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose';
import { TDoctor } from './doctor.type';
// Create Doctor Schema
const doctorSchema = new Schema<TDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialization: {
      type: Schema.Types.ObjectId,
      ref: 'Specialization',
      required: true,
    },
    hospitalName: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export Model
export const Doctor = model<TDoctor>('Doctor', doctorSchema);
