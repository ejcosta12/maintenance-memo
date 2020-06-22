import { getRepository } from 'typeorm';
import { max, isEqual, differenceInMonths } from 'date-fns';

import Motor from '../models/Motor';
import Maintenance from '../models/Maintenance';

interface Request {
  localUnit: number | undefined;
  localArea: number | undefined;
  limit: number;
  offset: number;
}

interface MotorsMaintenance {
  uuIdMotor: string;
  numIdMotor: number;
  lastValueIP: number;
  lastValueIA: number;
  dateLastMaintenance: number | Date;
  localUnit: number;
  localArea: number;
}
interface Response {
  quantityTotal: number;
  motorsMaintenances: MotorsMaintenance[];
}

class ListMotorsMaintenanceStatusService {
  public async execute({
    localUnit,
    localArea,
    limit,
    offset,
  }:Request): Promise<Response> {
    const motorsRepository = getRepository(Motor);
    const maintenancesRepository = getRepository(Maintenance);
    const maintenances = await maintenancesRepository.find();
    const motors = await motorsRepository.find();

    let motorsMaintenances: MotorsMaintenance[] = motors.map((motor) => {
      const maintenancesMotor = maintenances
        .filter((maintenance) => maintenance.motor_uuid === motor.uuId);

      const lastDateMaintenance = max(maintenancesMotor
        .map((maintenance) => maintenance.created_at));

      const lastMaintenanceMotor = maintenancesMotor
        .find((maintenance) => isEqual(maintenance.created_at, lastDateMaintenance));

      return ({
        uuIdMotor: motor.uuId,
        numIdMotor: motor.numId,
        lastValueIP: lastMaintenanceMotor?.valueIP || 0,
        lastValueIA: lastMaintenanceMotor?.valueIA || 0,
        dateLastMaintenance: lastMaintenanceMotor?.created_at || 0,
        localUnit: motor.localUnit,
        localArea: motor.localArea,
      });
    });

    if (localUnit) {
      motorsMaintenances = motorsMaintenances.filter(
        (motor) => motor.localUnit === localUnit,
      );
      if (localArea) {
        motorsMaintenances = motorsMaintenances.filter(
          (motor) => motor.localArea === localArea,
        );
      }
    }

    motorsMaintenances.sort(
      (motorA, motorB) => (
        (motorA.lastValueIA + motorA.lastValueIP) / 2)
        - ((motorB.lastValueIA + motorB.lastValueIP) / 2),
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIA < 1.25) {
          return -1;
        } if (motorB.lastValueIA < 1.25) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIP < 2) {
          return -1;
        } if (motorB.lastValueIP < 2) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIA < 1.1) {
          return -1;
        } if (motorB.lastValueIA < 1.1) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIP < 1.5) {
          return -1;
        } if (motorB.lastValueIP < 1.5) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIA < 1) {
          return -1;
        } if (motorB.lastValueIA < 1) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        if (motorA.lastValueIP < 1) {
          return -1;
        } if (motorB.lastValueIP < 1) {
          return 1;
        }
        return 0;
      },
    );

    motorsMaintenances.sort(
      (motorA, motorB) => {
        const aDurationInMonths = differenceInMonths(new Date(), motorA.dateLastMaintenance);
        const bDurationInMonths = differenceInMonths(new Date(), motorB.dateLastMaintenance);
        if (aDurationInMonths > 6 || motorA.dateLastMaintenance === 0) {
          return -1;
        } if (bDurationInMonths > 6 || motorB.dateLastMaintenance === 0) {
          return 1;
        }
        return 0;
      },
    );

    const quantityTotal = motorsMaintenances.length;

    if (limit >= 0 && offset >= 0) {
      let count = 0;
      motorsMaintenances = motorsMaintenances.filter(
        (motor, index) => {
          if (index >= offset && count < limit) {
            count += 1;
            return motor;
          }
          return false;
        },
      );
    }

    const response = {
      quantityTotal,
      motorsMaintenances,
    };

    return response;
  }
}

export default ListMotorsMaintenanceStatusService;
