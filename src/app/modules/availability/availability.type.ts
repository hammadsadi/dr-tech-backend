import { ObjectId } from 'mongoose';

export type TAvailability = {
  service: ObjectId;
  doctor: ObjectId;
  day: string;
  slots: string[];
};
