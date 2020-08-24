"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Motor = _interopRequireDefault(require("../models/Motor"));

var _AppErros = _interopRequireDefault(require("../errors/AppErros"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMotorService {
  async execute(numId) {
    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const findMotor = await motorsRepository.findOne({
      numId: Number(numId)
    });

    if (!findMotor) {
      throw new _AppErros.default('The informed motor does not exist');
    }

    return findMotor;
  }

}

var _default = ListMotorService;
exports.default = _default;