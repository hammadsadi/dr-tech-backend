// patient.controllers.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PatientServices } from './patient.services';
import config from '../../config';
import { TPatient } from './patient.type';

/**
 * @description Create Patient Controller
 * @method POST
 * @returns Token and Data
 */
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientServices.patientSaveToDatabase(req.body);
  res.cookie('dr_tech_token', result?.accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient registered successfully',
    data: result,
  });
});

/**
 * @description Get Patient Profile Controller
 * @method GET
 * @returns Patient Data
 */
const getPatientProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as TPatient).userId;
  const result = await PatientServices.getPatientProfile(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient profile retrieved successfully',
    data: result,
  });
});

/**
 * @description Get Patient Appointment Controller
 * @method GET
 * @returns Patient Data
 */
const getLoggedInUSerAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const result = await PatientServices.getMyAppointments(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Patient Appointments retrieved successfully',
      data: result,
    });
  },
);

export const PatientControllers = {
  createPatient,
  getPatientProfile,
  getLoggedInUSerAppointment,
};
