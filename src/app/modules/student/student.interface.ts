import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../acdemicDepartment/academicDepartment.interface';

// Define the interfaces for nested objects
export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type Gender = 'male' | 'female';
export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};
// Define the main interface for the data
export type IStudent = {
  id: string;
  name: UserName; // embadded field
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian; // embadded field
  localGuardian: ILocalGuardian; // embadded field
  profileImage?: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference field Assuming the ID of the AcademicFaculty model
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference field Assuming the ID of the AcademicDepartment model
  academicSemester: Types.ObjectId | IAcademicSemester; // reference field Assuming the ID of the AcademicSemester model
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};
