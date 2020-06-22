import { getRepository } from 'typeorm';

import AppError from '../errors/AppErros';

import Maintenance from '../models/Maintenance';
import Motor from '../models/Motor';

interface Request {
  numId: number;

  resistance30s: number;

  resistance60s: number;

  resistance10m: number;

  commentary: string
}

class CreateMaintenanceService {
  public async execute({
    numId,
    resistance30s,
    resistance60s,
    resistance10m,
    commentary,
  }: Request): Promise<Maintenance> {
    const valueIA = (resistance60s / resistance30s);
    const valueIP = (resistance10m / resistance60s);

    const maintenancesRepository = getRepository(Maintenance);
    const motorsRepository = getRepository(Motor);

    const findIdMotor = await motorsRepository.findOne({ numId });

    if (!findIdMotor) {
      throw new AppError('The informed motor does not exist');
    }

    const maintenance = maintenancesRepository.create({
      motor_uuid: findIdMotor.uuId,
      resistance30s,
      resistance60s,
      resistance10m,
      valueIP,
      valueIA,
      commentary,
    });

    await maintenancesRepository.save(maintenance);

    return maintenance;
  }
}

export default CreateMaintenanceService;
