import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentServices } from './appointment.service';

/**
 * @description Create Appointment Controller
 * @method POST
 * @returns  Data
 */
const createBooking = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await AppointmentServices.bookAppointment(req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Appointment Booked successfully',
    data: result,
  });
});

/**
 * @description Update Appointment Status Controller
 * @method PATCH
 * @returns  Data
 */
const updateBooking = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const result = await AppointmentServices.updateAppointment(
    userId,
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Appointment Status Updated successfully',
    data: result,
  });
});

export const AppointmentController = {
  createBooking,
  updateBooking,
};
