import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AvailabilityService } from './availability.services';

/**
 * @description Create Availability Controllers
 * @param ''
 * @returns Data
 */
const createAvailability = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await AvailabilityService.availabilitySaveToDB(
    req.body,
    userId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability Created Successful',
    data: result,
  });
});

/**
 * @description Get All Availability Controllers
 * @param ''
 * @returns Data
 */
const getAllAvailability = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await AvailabilityService.getAllAvailability(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability Retrieved Successful',
    data: result,
  });
});

/**
 * @description Update Availability Controllers
 * @param ''
 * @returns Data
 */
const updateAvailability = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const result = await AvailabilityService.updateAvailability(
    req.body,
    userId,
    id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability Updated Successful',
    data: result,
  });
});

export const AvailabilityController = {
  createAvailability,
  getAllAvailability,
  updateAvailability,
};
