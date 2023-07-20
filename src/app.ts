import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// cors setup
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application Routes
app.use('/api/v1/', routes);

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working succesfully')
//   throw new Error('Error is comming')
//   // Promise.reject(new Error('unhandle promise rejection.'))
//   // next('Error is comming...')
// })

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
