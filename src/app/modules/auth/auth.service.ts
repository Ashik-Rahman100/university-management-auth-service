import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

// create login user
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // check user exist
  //   const isUserExist = await User.findOne(
  //     { id },
  //     { id: 1, password: 1, needsPasswordChange: 1 }
  //   ).lean();
  //   create instance of user
  //   const user = new User();
  //   const isUserExist = await user.isUserExist(id);
  // check exist user
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not  Found');
  }

  //   Match Password
  //   const isPasswordMatched = await bcrypt.compare(
  //     password,
  //     isUserExist?.password
  //   );
  if (
    isUserExist?.password &&
    !(await User.isMatchedPassword(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not  exist');
  }
  // Create Access Token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // console.log(accessToken, refreshToken, needsPasswordChange);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    // invalid token
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    // console.log(verifiedToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }
  const { userId } = verifiedToken;
  // tumi delete hoye geso kintu tomar refresh token roye gece
  // checking user refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exits.');
  }
  // generate new Access Token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// create login user
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  // check exist user
  // const isUserExist = await User.isUserExist(user?.userId);

  // Alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  // console.log(isUserExist);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not  Found');
  }

  // is Matched password
  if (
    isUserExist?.password &&
    !(await User.isMatchedPassword(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect.');
  }
  /**

  // Hash password before save
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds as string)
  );
  // Query
  const query = { id: user?.userid };
  // Update password
  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };
  await User.findOneAndUpdate(query, updatedData);
 */

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  // Updating using save()
  isUserExist.save();
};
export const AuthService = { loginUser, refreshToken, changePassword };
