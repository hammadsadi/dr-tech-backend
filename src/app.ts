import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors Config
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

// Application Routes
app.use(router);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Dr Tech Server Is Running... 😇',
  });
});

// Error Handler
app.use(globalErrorHandler);
app.use(notFound);

// Export App
export default app;
