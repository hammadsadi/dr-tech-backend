import mongoose, { model } from 'mongoose';
import { THospital } from './hospital.type';

const hospitalSchema = new mongoose.Schema<THospital>(
  {
    name: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export Model
export const Hospital = model<THospital>('Hospital', hospitalSchema);
