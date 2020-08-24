"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppErros = _interopRequireDefault(require("../errors/AppErros"));

var _Motor = _interopRequireDefault(require("../models/Motor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteMotorService {
  async execute(id) {
    const motorsRepository = (0, _typeorm.getRepository)(_Motor.default);
    const deleteMotor = await motorsRepository.delete(id);

    if (deleteMotor.affected === 0) {
      throw new _AppErros.default('The informed motor does not exist');
    }
  }

}

var _default = DeleteMotorService;
exports.default = _default;