import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Services } from './service.services';

/**
 * @description Create Service Controllers
 * @param ''
 * @returns Data
 */
const createService = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await Services.createService(req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service Created Successful',
    data: result,
  });
});

/**
 * @description Get All Service Controllers
 * @param ''
 * @returns Data
 */
const getAllService = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await Services.getAllService(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service Retrieved Successful',
    data: result,
  });
});
/**
 * @description Update Service Controllers
 * @param ''
 * @returns Data
 */
const updateService = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const result = await Services.updateService(userId, id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service Updated Successful',
    data: result,
  });
});

/**
 * @description Delete Service Controllers
 * @param ''
 * @returns Data
 */
const deleteService = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const result = await Services.deleteService(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service Deleted Successful',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  updateService,
  getAllService,
  deleteService,
};
