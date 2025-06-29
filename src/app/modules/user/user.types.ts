/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { UserRole } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'Doctor' | 'Patient' | 'Admin';
};

export interface UserModel extends Model<TUser> {
  isExistUserByEmailOrNumber(emailOrNumber: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
