import { getRepository } from 'typeorm';

import AppError from '../errors/AppErros';

import Maintenance from '../models/Maintenance';
import Motor from '../models/Motor';

interface Request {
  motor_uuid: string;
  order: string;
}

class ListMaintenanceMotorOrderDateService {
  public async execute({ motor_uuid, order }: Request): Promise<Maintenance[]> {
    const maintenances = getRepository(Maintenance);
    const motors = getRepository(Motor);
    const findMotor = await motors.findOne(motor_uuid);
    if (!findMotor) {
      throw new AppError('The informed motor does not exist');
    }
    if ((order !== 'desc') && (order !== 'asc')) {
      throw new AppError('Error', 500);
    }

    const maintenancesFilter = await maintenances.find({ motor_uuid });

    if (order === 'desc') {
      maintenancesFilter.reverse();
    }

    return maintenancesFilter;
  }
}

export default ListMaintenanceMotorOrderDateService;
