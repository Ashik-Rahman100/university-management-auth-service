import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

export const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        require: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      //   required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
