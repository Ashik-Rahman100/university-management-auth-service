import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

// create Department in db
const loginUser = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...otherData } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  // // delete result.refreshToken; not remomanded
  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully.',
    data: otherData,
  });
});
// create Refresh Token Handler
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully.',
    data: result,
  });
});

export const AuthController = { loginUser, refreshToken };
