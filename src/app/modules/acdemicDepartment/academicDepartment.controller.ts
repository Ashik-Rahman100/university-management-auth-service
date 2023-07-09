import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';

// create Department in db
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department create successfully.',
    data: result,
  });
});

// Get single Department in db
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Department  successfully.',
    data: result,
  });
});

// Get All Departments in Db
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const result = await AcademicDepartmentService.getAllDepartment(
    paginationOptions,
    filters
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Get successfully.',
    meta: result.meta,
    data: result.data,
  });
});

// Update Department in db
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updateData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Academic Department Updated  successfully.',
    data: result,
  });
});

// Get single Department in db
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Academic Department deleted successfully.',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
