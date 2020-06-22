import { getRepository } from 'typeorm';
import Motor from '../models/Motor';
import AppError from '../errors/AppErros';

interface Request {
  id: string

  localUnit: number;

  localArea: number;
}

class UpdateMotorService {
  public async execute({
    id,
    localArea,
    localUnit,
  }: Request): Promise<Motor | undefined> {
    const motorsRepository = getRepository(Motor);

    const findMotor = await motorsRepository.findOne(id);

    if (findMotor === undefined) {
      throw new AppError('The informed motor does not exist');
    }

    const filterMotors = await motorsRepository.find({ localUnit, localArea });

    const incrementNumId = filterMotors.length + 1;

    const numId = Number(String(localUnit) + String(localArea) + String(incrementNumId));

    await motorsRepository.update(id, {
      numId,
      localUnit,
      localArea,
    });

    const motor = await motorsRepository.findOne(id);

    return motor;
  }
}

export default UpdateMotorService;
