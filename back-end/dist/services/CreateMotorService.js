"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Motor = _interopRequireDefault(require("../models/Motor"));

var _AppErros = _interopRequireDefault(require("../errors/AppErros"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateMotorService {
  async execute({
    type,
    power,
    localArea,
    localUnit
  }) {
    if (type !== 'CA' && type !== 'CC') {
      throw new _AppErros.default('Incorrect type motor, insert type CA or CC');
    }

    if (localArea === 0 || localUnit === 0) {
      throw new _AppErros.default('Incorrect local unit or area');
    }

    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const filterMotors = await motorsRepository.find({
      localUnit,
      localArea
    });
    const initialNumId = String(localUnit) + String(localArea);
    let lastNumId = 1;

    if (filterMotors.length !== 0) {
      lastNumId = filterMotors.map(motor => Number(String(motor.numId).slice(initialNumId.length))).reduce((acc, cur) => Math.max(acc, cur)) + 1;
    }

    const numId = Number(initialNumId + lastNumId);
    const motor = motorsRepository.create({
      numId,
      type,
      power,
      localArea,
      localUnit
    });
    await motorsRepository.save(motor);
    return motor;
  }

}

var _default = CreateMotorService;
exports.default = _default;