/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

// patient.types.ts
export interface TPatient {
  userId: mongoose.Types.ObjectId;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}


export interface IPatientInfo extends TPatient {
    name: string;
    email: string;
    password: string;
}

export interface PatientModel extends mongoose.Model<TPatient> {
  isExistPatientByEmailOrNumber(emailOrNumber: string): Promise<TPatient | null>;
}
