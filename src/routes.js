import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import authMiddleware from './app/middlewares/auth';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// User's routes
routes.get('/users', authMiddleware, UserController.index);
routes.put('/users', authMiddleware, UserController.update);

// Provider's routes
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// Appointment's routes
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Schedule's route
routes.get('/schedule', ScheduleController.index);

// Notification's routes
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// File upload's route
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
