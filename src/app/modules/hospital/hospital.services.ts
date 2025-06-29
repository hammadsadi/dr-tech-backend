import AppError from '../../errors/AppError';
import { Hospital } from './hospital.model';
import { THospital } from './hospital.type';

// Hospital Save to DB
const hospitalSaveToDB = async (payload: THospital) => {
  // Check if Hospital already exists
  const isHospitalExist = await Hospital.findOne({ name: payload.name });
  if (isHospitalExist) {
    throw new AppError(400, 'Hospital already exists');
  }
  // Create Hospital
  const result = await Hospital.create(payload);
  return result;
};

// Get All Hospital
const getAllHospital = async () => {
  const result = await Hospital.find({});
  return result;
};

// Get Single Hospital
const getSingleHospital = async (id: string) => {
  const result = await Hospital.findById(id);
  return result;
};

export const HospitalServices = {
  hospitalSaveToDB,
  getAllHospital,
  getSingleHospital,
};
