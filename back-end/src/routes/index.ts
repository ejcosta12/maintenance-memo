import { Router } from 'express';
import motorRouter from './motor.routes';
import maintenanceRouter from './maintenance.routes';

const routes = Router();

routes.use('/motors', motorRouter);
routes.use('/maintenance', maintenanceRouter);

export default routes;
