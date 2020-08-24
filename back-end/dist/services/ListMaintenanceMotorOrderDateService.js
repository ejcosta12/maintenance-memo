"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppErros = _interopRequireDefault(require("../errors/AppErros"));

var _Maintenance = _interopRequireDefault(require("../models/Maintenance"));

var _Motor = _interopRequireDefault(require("../models/Motor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMaintenanceMotorOrderDateService {
  async execute({
    motor_uuid,
    order
  }) {
    const maintenances = (0, _typeorm.getRepository)(_Maintenance.default);
    const motors = (0, _typeorm.getRepository)(_Motor.default);
    const findMotor = await motors.findOne(motor_uuid);

    if (!findMotor) {
      throw new _AppErros.default('The informed motor does not exist');
    }

    if (order !== 'desc' && order !== 'asc') {
      throw new _AppErros.default('Error', 500);
    }

    const maintenancesFilter = await maintenances.find({
      motor_uuid
    });

    if (order === 'desc') {
      maintenancesFilter.reverse();
    }

    return maintenancesFilter;
  }

}

var _default = ListMaintenanceMotorOrderDateService;
exports.default = _default;