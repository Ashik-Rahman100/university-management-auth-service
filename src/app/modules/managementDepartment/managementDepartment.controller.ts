import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

// create ManagementDepartment controller

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...manageDepartment } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      manageDepartment
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment updated successfully.',
      data: result,
    });
  }
);
// Get single ManagementDepartment
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment retrive successfully.',
      data: result,
    });
  }
);
// getAll  ManagementDepartment Data
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, ManagementDepartmentFilterableFields);
    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment retrive successfully.',
      meta: result.meta,
      data: result.data,
    });
  }
);

// update ManagementDepartmentcontroller

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment updated successfully.',
      data: result,
    });
  }
);
// delete single ManagementDepartment
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic ManagementDepartment deleted successfully.',
      data: result,
    });
  }
);
export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
