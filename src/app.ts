import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// read cookie
app.use(cookieParser());
// cors setup
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application Routes
app.use('/api/v1/', routes);

// Gloibal error handler
app.use(globalErrorHandler);
//handle not found

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
// const academicSemester = {
//   year: '2025',
//   code: '01',
// };

// const testId = async () => {
//   const testGenerateId = await generateFacultyId();
//   console.log(testGenerateId);
// };

// testId();

export default app;
