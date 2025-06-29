import { Types } from 'mongoose';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DoctorServices } from './doctor.services';

/**
 * @description Create Doctor Controllers
 * @param ''
 * @returns Token and Data
 */
const createDoctor = catchAsync(async (req, res) => {
  const result = await DoctorServices.doctorSaveToDatabase(req.body);
  res.cookie('dr_tech_token', result?.accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor Register Successful',
    data: result,
  });
});

/**
 * @description Get All Doctor Controllers
 * @Method GET
 * @param ''
 * @returns  Data
 */
const getAllDoctor = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await DoctorServices.getAllDoctor(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor Retrieved Successful',
    data: result,
  });
});

/**
 * @description Get All Logged In Doctor Appointments Controllers
 * @Method GET
 * @param ''
 * @returns  Data
 */
const getAllLoggedINDoctor = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await DoctorServices.getLoggedInDoctorAppointments(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged In Doctor Appointments Retrieved Successful',
    data: result,
  });
});

/**
 * @description Get Doctor Profile Controllers
 * @Method GET
 * @param ''
 * @returns  Data
 */
const getDoctorProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorServices.getDoctorProfile(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor Profile Retrieved Successful',
    data: result,
  });
});
export const DoctorControllers = {
  createDoctor,
  getAllDoctor,
  getAllLoggedINDoctor,
  getDoctorProfile
}
