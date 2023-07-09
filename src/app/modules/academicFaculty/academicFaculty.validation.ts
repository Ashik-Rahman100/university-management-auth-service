import { z } from 'zod';

// create academic faculty zod faculty
const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
// update academic faculty zod faculty
const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
