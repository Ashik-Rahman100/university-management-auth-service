import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHander';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// cors setup
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application Routes
app.use('/api/v1/users', UserRoutes);

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working succesfully')
//   throw new Error('Error is comming')
//   // Promise.reject(new Error('unhandle promise rejection.'))
//   // next('Error is comming...')
// })

// Gloibal error handler
app.use(globalErrorHandler);

export default app;
