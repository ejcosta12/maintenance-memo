import { getRepository } from 'typeorm';
import Motor from '../models/Motor';
import AppError from '../errors/AppErros';

class ListMotorService {
  public async execute(numId: String): Promise<Motor> {
    const motorsRepository = getRepository(Motor);

    const findMotor = await motorsRepository.findOne({ numId: Number(numId) });

    if (!findMotor) {
      throw new AppError('The informed motor does not exist');
    }

    return findMotor;
  }
}

export default ListMotorService;
