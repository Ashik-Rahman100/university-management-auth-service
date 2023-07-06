import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemeseterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required.',
    }),
    year: z.number({ required_error: 'Year is Required.' }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is Required.',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is Required.',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is Required.',
    }),
  }),
});

export const AcademicSemesterValidation = { createAcademicSemeseterZodSchema };
