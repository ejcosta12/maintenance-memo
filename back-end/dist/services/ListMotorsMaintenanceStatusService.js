"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _dateFns = require("date-fns");

var _Motor = _interopRequireDefault(require("../models/Motor"));

var _Maintenance = _interopRequireDefault(require("../models/Maintenance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMotorsMaintenanceStatusService {
  async execute({
    localUnit,
    localArea,
    limit,
    offset
  }) {
    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const maintenancesRepository = (0, _typeorm.getRepository)(_Maintenance.default);
    const maintenances = await maintenancesRepository.find();
    const motors = await motorsRepository.find();
    let motorsMaintenances = motors.map(motor => {
      const maintenancesMotor = maintenances.filter(maintenance => maintenance.motor_uuid === motor.uuId);
      const lastDateMaintenance = (0, _dateFns.max)(maintenancesMotor.map(maintenance => maintenance.created_at));
      const lastMaintenanceMotor = maintenancesMotor.find(maintenance => (0, _dateFns.isEqual)(maintenance.created_at, lastDateMaintenance));
      return {
        uuIdMotor: motor.uuId,
        numIdMotor: motor.numId,
        lastValueIP: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.valueIP) || 0,
        lastValueIA: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.valueIA) || 0,
        dateLastMaintenance: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.created_at) || 0,
        localUnit: motor.localUnit,
        localArea: motor.localArea
      };
    });

    if (localUnit) {
      motorsMaintenances = motorsMaintenances.filter(motor => motor.localUnit === localUnit);

      if (localArea) {
        motorsMaintenances = motorsMaintenances.filter(motor => motor.localArea === localArea);
      }
    }

    motorsMaintenances.sort((motorA, motorB) => (motorA.lastValueIA + motorA.lastValueIP) / 2 - (motorB.lastValueIA + motorB.lastValueIP) / 2);
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIA < 1.25) {
        return -1;
      }

      if (motorB.lastValueIA < 1.25) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIP < 2) {
        return -1;
      }

      if (motorB.lastValueIP < 2) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIA < 1.1) {
        return -1;
      }

      if (motorB.lastValueIA < 1.1) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIP < 1.5) {
        return -1;
      }

      if (motorB.lastValueIP < 1.5) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIA < 1) {
        return -1;
      }

      if (motorB.lastValueIA < 1) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      if (motorA.lastValueIP < 1) {
        return -1;
      }

      if (motorB.lastValueIP < 1) {
        return 1;
      }

      return 0;
    });
    motorsMaintenances.sort((motorA, motorB) => {
      const aDurationInMonths = (0, _dateFns.differenceInMonths)(new Date(), motorA.dateLastMaintenance);
      const bDurationInMonths = (0, _dateFns.differenceInMonths)(new Date(), motorB.dateLastMaintenance);

      if (aDurationInMonths > 6 || motorA.dateLastMaintenance === 0) {
        return -1;
      }

      if (bDurationInMonths > 6 || motorB.dateLastMaintenance === 0) {
        return 1;
      }

      return 0;
    });
    const quantityTotal = motorsMaintenances.length;

    if (limit >= 0 && offset >= 0) {
      let count = 0;
      motorsMaintenances = motorsMaintenances.filter((motor, index) => {
        if (index >= offset && count < limit) {
          count += 1;
          return motor;
        }

        return false;
      });
    }

    const response = {
      quantityTotal,
      motorsMaintenances
    };
    return response;
  }

}

var _default = ListMotorsMaintenanceStatusService;
exports.default = _default;