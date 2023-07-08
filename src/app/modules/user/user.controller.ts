import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

// create user in db
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    // console.log(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user create successfully.',
      data: result,
    });
  }
);

export const UserController = { createUser };
