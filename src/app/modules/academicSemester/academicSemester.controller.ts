import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interfate';
import { AcademicSemesterService } from './academicSemester.service';

// create semester in db
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    // console.log(user)
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic semester create successfully.',
    //   data: result,
    // });
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester create successfully.',
      data: result,
    });
    next();
  }
);
// create semester in db
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.body, ['searchTerms']);
    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrive successfully.',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = { createSemester, getAllSemesters };
