import { ObjectId } from 'mongoose';

export type TService = {
  title: string;
  description: string;
  price: number;
  duration: number;
  doctor: ObjectId;
};
