/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/auth.utils';
import { Hospital } from '../hospital/hospital.model';
import { Specialization } from '../specialization/specialization.model';
import { Doctor } from './doctor.model';
import { User } from '../user/user.model';
import { Appointment } from '../appointment/appointment.model';
import { Service } from '../service/service.model';
import { Availability } from '../availability/availability.mode';

// Create Doctor
const doctorSaveToDatabase = async (doctorInfo: any) => {
  const { phone, specialization, hospitalName, name, email, password } =
    doctorInfo;
  // Check User
  const isExistDoctor = await User.findOne({ email });
  // console.log(isExistDoctor);
  if (isExistDoctor) {
    throw new AppError(400, 'Doctor Already Exist!');
  }

  // Check Specialization
  const isExistSpecialization = await Specialization.findById(
    doctorInfo?.specialization,
  );
  if (!isExistSpecialization) {
    throw new AppError(400, 'Specialization Not Found!');
  }
  // Check Hospital
  const isExistHospital = await Hospital.findById(doctorInfo?.hospitalName);
  if (!isExistHospital) {
    throw new AppError(400, 'Hospital Not Found!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const createUser = await User.create(
      [
        {
          name,
          email,
          password,
          role: 'Doctor',
        },
      ],
      { session },
    );
    // Create Doctor
    await Doctor.create(
      [
        {
          userId: createUser[0]._id,
          phone,
          specialization,
          hospitalName,
        },
      ],
      { session },
    );

    // Create Token
    const doctorPayload = {
      userEmail: createUser[0]?.email,
      role: createUser[0]?.role,
      userId: createUser[0]?._id,
    };
    const token = createToken(
      doctorPayload,
      config.JWT_ACCESS_TOKEN_SECRET as string,
      config.JWT_ACCESS_EXPIRES_IN as string,
    );
    await session.commitTransaction();
    session.endSession();
    return { accessToken: token };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, 'Failed to Create Doctor!');
  }
};

// Get All Doctor
const getAllDoctor = async (query: Record<string, unknown>) => {
  console.log('Query:', query);
  const matchStage: any = {};
  const excludeFields = ['sort', 'limit', 'page', 'fields'];

  // ✅ নেস্টেড ফিল্ড হ্যান্ডলিং
  for (const key in query) {
    if (excludeFields.includes(key)) continue;

    const value = query[key];
    if (key.includes('.')) {
      // নেস্টেড ফিল্ড (যেমন: hospital.name, specialization.name)
      const [field, subField] = key.split('.');
      if (field === 'hospitalName') {
        matchStage[`hospital.${subField}`] = value;
      } else if (field === 'specialization') {
        matchStage[`specialization.${subField}`] = value;
      } else if (field === 'user') {
        matchStage[`user.${subField}`] = value;
      }
    } else {
      // সরাসরি ফিল্ড (যেমন: phone)
      matchStage[key] = value;
    }
  }

  // ✅ পেজিনেশন
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ✅ প্রধান অ্যাগ্রিগেশন পাইপলাইন
  const result = await Doctor.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $lookup: {
        from: 'specializations',
        localField: 'specialization',
        foreignField: '_id',
        as: 'specialization',
      },
    },
    { $unwind: '$specialization' },
    {
      $lookup: {
        from: 'hospitals',
        localField: 'hospitalName',
        foreignField: '_id',
        as: 'hospital',
      },
    },
    { $unwind: '$hospital' },
    { $match: matchStage },
    {
      $project: {
        _id: 1,
        phone: 1,
        'user._id': 1,
        'user.name': 1,
        'user.email': 1,
        'user.role': 1,
        'specialization._id': 1,
        'specialization.name': 1,
        'hospital._id': 1,
        'hospital.name': 1,
        'hospital.floor': 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  // ✅ মোট গণনা
  const total = await Doctor.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $lookup: {
        from: 'specializations',
        localField: 'specialization',
        foreignField: '_id',
        as: 'specialization',
      },
    },
    { $unwind: '$specialization' },
    {
      $lookup: {
        from: 'hospitals',
        localField: 'hospitalName',
        foreignField: '_id',
        as: 'hospital',
      },
    },
    { $unwind: '$hospital' },
    { $match: matchStage },
    { $count: 'total' },
  ]);

  const meta = {
    page,
    limit,
    total: total[0]?.total || 0,
    totalPage: Math.ceil((total[0]?.total || 0) / limit),
  };

  return {
    meta,
    result,
  };
};

// Get All Logged In Doctor Appointment
const getLoggedInDoctorAppointments = async (userId: string) => {
  // Get Doctor Information
  const doctorInfo = await Doctor.findOne({ userId: userId });
  const allAppointments = await Appointment.find({ doctorId: doctorInfo?._id });
  return allAppointments;
};

const getDoctorProfile = async (userId: string) => {
  //   See:

  // Services

  // Availability

  // Hospital info (name, floor)

  // Remaining available slots for each service

  const doctor = await Doctor.findOne({ userId })
    .select('_id phone userId specialization hospitalName')
    .populate('userId', '_id name email role')
    .populate('specialization', '_id name')
    .populate('hospitalName', '_id name floor')
    .lean();

  if (!doctor) {
    throw new AppError(404, 'Doctor not found!');
  }

  const services = await Service.find({ doctor: doctor?._id });
  const availabilities = await Availability.find({ doctor: doctor?._id });

  return {
    doctor,
    services,
    availabilities,
  };
};

export const DoctorServices = {
  doctorSaveToDatabase,
  getAllDoctor,
  getLoggedInDoctorAppointments,
  getDoctorProfile,
};
