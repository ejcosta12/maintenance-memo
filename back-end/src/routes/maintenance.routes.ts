import { Router } from 'express';

import ListMaintenanceMotorOrderDateService from '../services/ListMaintenanceMotorOrderDateService';
import CreateMaintenanceService from '../services/CreateMaintenanceService';

const maintenanceRouter = Router();

maintenanceRouter.get('/:motor_uuid', async (request, response) => {
  const { motor_uuid } = request.params;
  const { order } = request.query;
  const maintenanceLastDate = await new ListMaintenanceMotorOrderDateService()
    .execute({ motor_uuid, order: String(order) });
  response.json(maintenanceLastDate);
});

maintenanceRouter.post('/:numId', async (request, response) => {
  const { numId } = request.params;

  const createMaintenanceService = new CreateMaintenanceService();

  const {
    resistance30s,
    resistance60s,
    resistance10m,
    commentary,
  } = request.body;

  const maintenance = await createMaintenanceService.execute({
    numId: Number(numId),
    resistance30s,
    resistance60s,
    resistance10m,
    commentary,
  });
  response.json(maintenance);
});

export default maintenanceRouter;
