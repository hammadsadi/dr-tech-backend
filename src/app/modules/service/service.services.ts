import { Doctor } from '../doctor/doctor.model';
import { Service } from './service.model';
import { TService } from './service.type';

// Create Service
const createService = async (payload: TService, doctor: string) => {
  // Get Doctor Information
  const doctorInfo = await Doctor.findOne({ userId: doctor });
  // Check Service
  const isExist = await Service.findOne({
    title: payload.title,
    doctor: doctorInfo?._id,
  });
  if (isExist) {
    throw new Error('Service already exist');
  }
  // Create Service
  const result = await Service.create({ ...payload, doctor: doctorInfo?._id });
  return result;
};

// Get All Services
const getAllService = async (doctorId: string) => {
  // Get Doctor Information
  const doctorInfo = await Doctor.findOne({ userId: doctorId });
  const result = await Service.find({ doctor: doctorInfo?._id });
  return result;
};
// Update Service
const updateService = async (
  doctorId: string,
  id: string,
  payload: Partial<TService>,
) => {
  const doctorInfo = await Doctor.findOne({ userId: doctorId });
  // Check Service
  const isExist = await Service.findOne({ _id: id, doctor: doctorInfo?._id });
  if (!isExist) {
    throw new Error('Service not found');
  }
  // Update Service
  const result = await Service.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete Service
const deleteService = async (id: string, doctorId: string) => {
  const doctorInfo = await Doctor.findOne({ userId: doctorId });
  // Check Service
  const isExist = await Service.findOne({ _id: id, doctor: doctorInfo?._id });
  if (!isExist) {
    throw new Error('Service not found');
  }
  // Delete Service
  const result = await Service.findOneAndDelete({
    _id: id,
    doctor: doctorInfo?._id,
  });
  return result;
};

export const Services = {
  createService,
  updateService,
  deleteService,
  getAllService,
};
