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
const getAllDoctor = async (query: Record<string, any>) => {
  const matchStage: any = {};
  const excludeFields = ['sort', 'limit', 'page', 'fields'];

  //   query keys to nested fields
  for (const key in query) {
    if (excludeFields.includes(key)) continue;

    const value = query[key];

    switch (key) {
      case 'hospital':
        matchStage['hospital.name'] = value;
        break;
      case 'specialization':
        matchStage['specialization.name'] = value;
        break;
      case 'doctor':
        matchStage['user.name'] = value;
        break;
      default:
        if (key.includes('.')) {
          matchStage[key] = value;
        } else {
          matchStage[key] = value;
        }
    }
  }

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Aggregate query with lookups
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

    // Filter
    { $match: matchStage },

    //  Fields to return
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

    // Pagination
    { $skip: skip },
    { $limit: limit },
  ]);

  // Total count for meta
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
const getLoggedInDoctorAppointments = async (
  userId: string,
  status?: 'pending' | 'accepted' | 'cancelled' | 'completed',
) => {
  // Get Doctor Information
  const doctorInfo = await Doctor.findOne({ userId });

  if (!doctorInfo) {
    throw new AppError(404, 'Doctor not found');
  }

  // Build filter condition
  const filter: any = { doctorId: doctorInfo._id };
  if (status) {
    filter.status = status;
  }

  // Fetch appointments based on filter
  const appointments = await Appointment.find(filter)
    .populate({
      path: 'patientId',
      model: 'User',
      select: 'name email',
    })
    .populate({
      path: 'serviceId',
      model: 'Service',
      select: 'title',
    })
    .populate({
      path: 'doctorId',
      model: 'Doctor',
      select: 'phone',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'name email',
      },
    });

  return appointments;
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
