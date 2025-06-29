import AppError from '../../errors/AppError';
import { Specialization } from './specialization.model';
import { TSpecialization } from './specialization.type';

// Specialization Save to DB
const specializationSaveToDB = async (payload: TSpecialization) => {
  // Check if Specialization already exists
  const isSpecializationExist = await Specialization.findOne({
    name: payload.name,
  });
  if (isSpecializationExist) {
    throw new AppError(400, 'Specialization already exists');
  }
  // Create Specialization
  const result = await Specialization.create(payload);
  return result;
};

// Get All Specialization
const getAllSpecialization = async () => {
  const result = await Specialization.find({});
  return result;
};

// Get Single Specialization
const getSingleSpecialization = async (id: string) => {
  const result = await Specialization.findById(id);
  return result;
};

export const SpecializationServices = {
  specializationSaveToDB,
  getAllSpecialization,
  getSingleSpecialization,
};
