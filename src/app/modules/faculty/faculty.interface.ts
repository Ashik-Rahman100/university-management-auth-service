import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../acdemicDepartment/academicDepartment.interface';

// Define the interfaces for nested objects
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
export type IFaculty = {
  id: string;
  name: UserName; // embadded field
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference field Assuming the ID of the AcademicFaculty model
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference field Assuming the ID of the AcademicDepartment model
  academicSemester: Types.ObjectId | IAcademicSemester; // reference field Assuming the ID of the AcademicSemester model
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};
