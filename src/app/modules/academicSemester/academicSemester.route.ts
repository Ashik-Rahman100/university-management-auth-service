import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { UserController } from './user.controller';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemeseterZodSchema),
  AcademicSemesterController.createSemester
);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
