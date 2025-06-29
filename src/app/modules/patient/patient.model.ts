
// patient.model.ts
import { Schema, model } from 'mongoose';
import { User } from '../user/user.model';
import { PatientModel, TPatient } from './patient.type';


const patientSchema = new Schema<TPatient, PatientModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be at least 1'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.statics.isExistPatientByEmailOrNumber = async function (
  emailOrNumber: string,
) {
  const user = await User.findOne({
    $or: [{ email: emailOrNumber }, { phone: emailOrNumber }],
  });
  if (!user) return null;
  return await Patient.findOne({ userId: user._id });
};

export const Patient = model<TPatient, PatientModel>('Patient', patientSchema);