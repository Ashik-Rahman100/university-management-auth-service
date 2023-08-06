/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAdmin } from '../admin/admin.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  faculty?: Types.ObjectId | IAcademicFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>;
  isMatchedPassword(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// Instance Method using
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser | null>>;
//   isMatchedPassword(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
