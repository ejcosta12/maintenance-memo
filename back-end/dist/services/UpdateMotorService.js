"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Motor = _interopRequireDefault(require("../models/Motor"));

var _AppErros = _interopRequireDefault(require("../errors/AppErros"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateMotorService {
  async execute({
    id,
    localArea,
    localUnit
  }) {
    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const findMotor = await motorsRepository.findOne(id);

    if (findMotor === undefined) {
      throw new _AppErros.default('The informed motor does not exist');
    }

    const filterMotors = await motorsRepository.find({
      localUnit,
      localArea
    });
    const incrementNumId = filterMotors.length + 1;
    const numId = Number(String(localUnit) + String(localArea) + String(incrementNumId));
    await motorsRepository.update(id, {
      numId,
      localUnit,
      localArea
    });
    const motor = await motorsRepository.findOne(id);
    return motor;
  }

}

var _default = UpdateMotorService;
exports.default = _default;