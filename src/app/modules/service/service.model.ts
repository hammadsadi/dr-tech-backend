import mongoose, { model } from 'mongoose';
import { TService } from './service.type';

const serviceSchema = new mongoose.Schema<TService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
  },
  { timestamps: true },
);

// Export Model
export const Service = model<TService>('Service', serviceSchema);
