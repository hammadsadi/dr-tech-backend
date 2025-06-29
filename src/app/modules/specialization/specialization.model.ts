import mongoose, { model } from 'mongoose';
import { TSpecialization } from './specialization.type';

const specializationSchema = new mongoose.Schema<TSpecialization>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export Model
export const Specialization = model<TSpecialization>(
  'Specialization',
  specializationSchema,
);
