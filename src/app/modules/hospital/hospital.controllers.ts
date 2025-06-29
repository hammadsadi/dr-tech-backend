import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HospitalServices } from './hospital.services';

/**
 * @description Create Hospital Controllers
 * @Method POST
 * @param ''
 * @returns  Data
 */
const createHospital = catchAsync(async (req, res) => {
  const result = await HospitalServices.hospitalSaveToDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital Created Successful',
    data: result,
  });
});

/**
 * @description Get All Hospital Controllers
 * @Method GET
 * @param ''
 * @returns  Data
 */
const getAllHospital = catchAsync(async (req, res) => {
  const result = await HospitalServices.getAllHospital();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital Retrieved Successful',
    data: result,
  });
});

/**
 * @description Get Single Hospital Controllers
 * @Method GET
 * @param ''
 * @returns  Data
 */
const getSingleHospital = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HospitalServices.getSingleHospital(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital Retrieved Successful',
    data: result,
  });
});

export const HospitalControllers = {
  createHospital,
  getAllHospital,
  getSingleHospital,
};
