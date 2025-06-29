import AppError from '../../errors/AppError';
import { Doctor } from '../doctor/doctor.model';
import { Service } from '../service/service.model';
import { Availability } from './availability.mode';
import { TAvailability } from './availability.type';

const availabilitySaveToDB = async (
  payload: TAvailability,
  doctorId: string,
) => {
  const { slots } = payload;

  // Get Doctor Information
  const doctorInformation = await Doctor.findOne({ userId: doctorId });
  // Check Service
  const isExistService = await Service.findOne({
    _id: payload.service,
    doctor: doctorInformation?._id,
  });
  if (!isExistService) {
    throw new AppError(404, 'Service not found');
  }

  // Check Availability
  const isExistAvailability = await Availability.findOne({
    service: payload.service,
    doctor: doctorInformation?._id,
    day: payload.day,
  });
  if (isExistAvailability) {
    throw new AppError(400, 'Availability already exists for this day');
  }

  // Check Slots
  if (!Array.isArray(slots) || slots.length === 0) {
    throw new AppError(400, 'Slots must be an array and not empty');
  }
  // Check Slots Format
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/;
  for (const slot of slots) {
    if (typeof slot !== 'string' || !timeRegex.test(slot)) {
      throw new AppError(400, 'Invalid slot format');
    }
  }
  // Check Duplicate Slots
  const uniqueSlots = new Set(slots);
  if (uniqueSlots.size !== slots.length) {
    throw new AppError(400, 'Duplicate slots are not allowed');
  }
  const result = await Availability.create({
    ...payload,
    doctor: doctorInformation?._id,
  });
  return result;
};

const updateAvailability = async (
  payload: TAvailability,
  doctorId: string,
  availabilityId: string,
) => {
  const { slots, day, service } = payload;
  // Get Doctor Information
  const doctorInformation = await Doctor.findOne({ userId: doctorId });
  // Check Service
  if (service) {
    const isExistService = await Service.findOne({
      _id: payload.service,
      doctor: doctorInformation?._id,
    });
    if (!isExistService) {
      throw new AppError(404, 'Service not found');
    }
  }

  // Check Availability
  const isExistAvailability = await Availability.findOne({
    doctor: doctorInformation?._id,
    _id: availabilityId,
  });
  if (!isExistAvailability) {
    throw new AppError(400, 'Availability not found');
  }

  if (slots) {
    // Check Slots
    if (!Array.isArray(slots) || slots.length === 0) {
      throw new AppError(400, 'Slots must be an array and not empty');
    }
    // Check Slots Format
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/;
    for (const slot of slots) {
      if (typeof slot !== 'string' || !timeRegex.test(slot)) {
        throw new AppError(400, 'Invalid slot format');
      }
    }
    // Check Duplicate Slots
    const uniqueSlots = new Set(slots);
    if (uniqueSlots.size !== slots.length) {
      throw new AppError(400, 'Duplicate slots are not allowed');
    }

    if (day) {
      const isExistAvailabilityCheck = await Availability.findOne({
        doctor: doctorInformation?._id,
        day: day,
        _id: { $ne: availabilityId },
        slots: { $in: slots },
      });
      if (isExistAvailabilityCheck) {
        throw new AppError(400, 'Availability already exists for this day');
      }
    }
  }

  const result = await Availability.findOneAndUpdate(
    { _id: availabilityId, doctor: doctorInformation?._id },
    { ...payload, doctor: doctorInformation?._id },
    { new: true },
  );
  return result;
};

// Get All Availability
const getAllAvailability = async (doctorId: string) => {
  // Get Doctor Information
  const doctorInformation = await Doctor.findOne({ userId: doctorId });
  const result = await Availability.find({ doctor: doctorInformation?._id });
  return result;
};

export const AvailabilityService = {
  availabilitySaveToDB,
  getAllAvailability,
  updateAvailability,
};
