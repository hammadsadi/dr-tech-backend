import mongoose, { Types } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/auth.utils';
import { User } from '../user/user.model';
import { Patient } from './patient.model';
import { IPatientInfo } from './patient.type';
import { Appointment } from '../appointment/appointment.model';

// Create Patient
const patientSaveToDatabase = async (patientInfo: IPatientInfo) => {
  const { phone, age, gender, name, email, password } = patientInfo;

  // Check if user already exists
  const isExistUser = await User.isExistUserByEmailOrNumber(email);
  if (isExistUser) {
    throw new AppError(400, 'Patient already exists!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create User
    const createUser = await User.create(
      [
        {
          name,
          email,
          password,
          role: 'Patient',
        },
      ],
      { session },
    );

    // Create Patient
    await Patient.create(
      [
        {
          userId: createUser[0]._id,
          phone,
          age,
          gender,
        },
      ],
      { session },
    );

    // Create Token
    const patientPayload = {
      userEmail: createUser[0]?.email,
      role: createUser[0]?.role,
      userId: createUser[0]?._id,
    };
    const token = createToken(
      patientPayload,
      config.JWT_ACCESS_TOKEN_SECRET as string,
      config.JWT_ACCESS_EXPIRES_IN as string,
    );

    await session.commitTransaction();
    session.endSession();
    return { accessToken: token };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, error?.message || 'Failed to create patient!');
  }
};

const getPatientProfile = async (userId: Types.ObjectId) => {
  const patient = await Patient.findOne({ userId }).populate({
    path: 'userId',
    select: 'name email role',
  });
  if (!patient) {
    throw new AppError(404, 'Patient not found!');
  }
  return patient;
};

// Get My Appointments
const getMyAppointments = async (patientId: string) => {
  const myAppointments = await Appointment.find({ patientId })
    .populate({
      path: 'doctorId',
      model: 'Doctor',
      select: 'phone',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'name email',
      },
    })
    .populate({
      path: 'patientId',
      model: 'User',
      select: 'name email',
    })
    .populate({
      path: 'serviceId',
      model: 'Service',
      select: 'title price duration',
    });

  return myAppointments;
};

export const PatientServices = {
  patientSaveToDatabase,
  getPatientProfile,
  getMyAppointments,
};
