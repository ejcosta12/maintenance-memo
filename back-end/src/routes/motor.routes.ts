import { Router } from 'express';

import CreateMotorService from '../services/CreateMotorService';
import DeleteMotorService from '../services/DeleteMotorService';
import UpdateMotorService from '../services/UpdateMotorService';
import ListMotorsMaintenanceStatusService from '../services/ListMotorsMaintenanceStatusService';
import ListMotorService from '../services/ListMotorService';


const motorRouter = Router();

motorRouter.get('/listmotor/:numId', async (request, response) => {
  const { numId } = request.params;
  const listMotorService = new ListMotorService();
  const motor = await listMotorService.execute(numId);
  return response.json(motor);
});

motorRouter.get('/maintenance', async (request, response) => {
  const {
    localUnit,
    localArea,
    limit,
    offset,
  } = request.query;

  const listMotorsMaintenancesStatusService = new ListMotorsMaintenanceStatusService();
  const motorsMaintenances = await listMotorsMaintenancesStatusService.execute({
    localUnit: Number(localUnit),
    localArea: Number(localArea),
    limit: Number(limit),
    offset: Number(offset),
  });
  return response.json(motorsMaintenances);
});

motorRouter.post('/', async (request, response) => {
  const createMotorService = new CreateMotorService();
  const {
    type, power, localUnit, localArea,
  } = request.body;

  const motor = await createMotorService.execute({
    type,
    power,
    localUnit,
    localArea,
  });

  response.json(motor);
});

motorRouter.put('/:id', async (request, response) => {
  const updateMotorService = new UpdateMotorService();
  const { id } = request.params;
  const { localUnit, localArea } = request.body;

  const motor = await updateMotorService.execute({
    id,
    localUnit,
    localArea,
  });

  response.json(motor);
});

motorRouter.delete('/:id', async (request, response) => {
  const deleteMotorService = new DeleteMotorService();
  const { id } = request.params;
  await deleteMotorService.execute(id);
  response.status(204).send();
});
export default motorRouter;
