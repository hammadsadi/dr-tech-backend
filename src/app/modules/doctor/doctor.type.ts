import { ObjectId } from 'mongoose';

export type TDoctor = {
  phone: string;
  specialization: ObjectId;
  hospitalName: ObjectId;
  userId: ObjectId;
};
