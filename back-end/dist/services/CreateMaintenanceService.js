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

class CreateMaintenanceService {
  async execute({
    numId,
    resistance30s,
    resistance60s,
    resistance10m,
    commentary
  }) {
    const valueIA = resistance60s / resistance30s;
    const valueIP = resistance10m / resistance60s;
    const maintenancesRepository = (0, _typeorm.getRepository)(_Maintenance.default);
    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const findIdMotor = await motorsRepository.findOne({
      numId
    });

    if (!findIdMotor) {
      throw new _AppErros.default('The informed motor does not exist');
    }

    const maintenance = maintenancesRepository.create({
      motor_uuid: findIdMotor.uuId,
      resistance30s,
      resistance60s,
      resistance10m,
      valueIP,
      valueIA,
      commentary
    });
    await maintenancesRepository.save(maintenance);
    return maintenance;
  }

}

var _default = CreateMaintenanceService;
exports.default = _default;