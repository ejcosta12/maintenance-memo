"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ListMaintenanceMotorOrderDateService = _interopRequireDefault(require("../services/ListMaintenanceMotorOrderDateService"));

var _CreateMaintenanceService = _interopRequireDefault(require("../services/CreateMaintenanceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const maintenanceRouter = (0, _express.Router)();
maintenanceRouter.get('/:motor_uuid', async (request, response) => {
  const {
    motor_uuid
  } = request.params;
  const {
    order
  } = request.query;
  const maintenanceLastDate = await new _ListMaintenanceMotorOrderDateService.default().execute({
    motor_uuid,
    order: String(order)
  });
  response.json(maintenanceLastDate);
});
maintenanceRouter.post('/:numId', async (request, response) => {
  const {
    numId
  } = request.params;
  const createMaintenanceService = new _CreateMaintenanceService.default();
  const {
    resistance30s,
    resistance60s,
    resistance10m,
    commentary
  } = request.body;
  const maintenance = await createMaintenanceService.execute({
    numId: Number(numId),
    resistance30s,
    resistance60s,
    resistance10m,
    commentary
  });
  response.json(maintenance);
});
var _default = maintenanceRouter;
exports.default = _default;