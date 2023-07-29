import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

// create user as a student in db
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    // console.log(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user create successfully.',
      data: result,
    });
  }
);
// create user as a Faculty in db
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    console.log(req.cookies, 'cookie');
    const result = await UserService.createFaculty(faculty, userData);
    // console.log(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty create successfully.',
      data: result,
    });
  }
);
// create user as a Admin in db
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);
    // console.log(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin create successfully.',
      data: result,
    });
  }
);

export const UserController = { createStudent, createFaculty, createAdmin };
