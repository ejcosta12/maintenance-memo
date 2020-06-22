import { getRepository } from 'typeorm';
import Motor from '../models/Motor';
import AppError from '../errors/AppErros';

interface Request {
  type: 'CA' | 'CC';

  power: number;

  localUnit: number;

  localArea: number;
}

class CreateMotorService {
  public async execute({
    type,
    power,
    localArea,
    localUnit,
  }: Request): Promise<Motor> {
    if ((type !== 'CA') && (type !== 'CC')) {
      throw new AppError('Incorrect type motor, insert type CA or CC');
    }
    if ((localArea === 0) || (localUnit === 0)) {
      throw new AppError('Incorrect local unit or area');
    }
    const motorsRepository = getRepository(Motor);

    const filterMotors = await motorsRepository.find({ localUnit, localArea });
    const initialNumId = String(localUnit) + String(localArea);
    let lastNumId = 1;

    if (filterMotors.length !== 0) {
      lastNumId = filterMotors
        .map((motor) => Number(String(motor.numId).slice(initialNumId.length)))
        .reduce((acc, cur) => Math.max(acc, cur)) + 1;
    }
    const numId = Number(initialNumId + lastNumId);

    const motor = motorsRepository.create({
      numId,
      type,
      power,
      localArea,
      localUnit,
    });

    await motorsRepository.save(motor);

    return motor;
  }
}

export default CreateMotorService;
