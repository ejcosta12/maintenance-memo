import { getRepository } from 'typeorm';

import AppError from '../errors/AppErros';

import Motor from '../models/Motor';


class DeleteMotorService {
  public async execute(id : string): Promise<any> {
    const motorsRepository = getRepository(Motor);

    const deleteMotor = await motorsRepository.delete(id);
    if (deleteMotor.affected === 0) {
      throw new AppError('The informed motor does not exist');
    }
  }
}
export default DeleteMotorService;
