import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

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
export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference field Assuming the ID of the AcademicFaculty model
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};
