"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateMotorService = _interopRequireDefault(require("../services/CreateMotorService"));

var _DeleteMotorService = _interopRequireDefault(require("../services/DeleteMotorService"));

var _UpdateMotorService = _interopRequireDefault(require("../services/UpdateMotorService"));

var _ListMotorsMaintenanceStatusService = _interopRequireDefault(require("../services/ListMotorsMaintenanceStatusService"));

var _ListMotorService = _interopRequireDefault(require("../services/ListMotorService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const motorRouter = (0, _express.Router)();
motorRouter.get('/listmotor/:numId', async (request, response) => {
  const {
    numId
  } = request.params;
  const listMotorService = new _ListMotorService.default();
  const motor = await listMotorService.execute(numId);
  return response.json(motor);
});
motorRouter.get('/maintenance', async (request, response) => {
  const {
    localUnit,
    localArea,
    limit,
    offset
  } = request.query;
  const listMotorsMaintenancesStatusService = new _ListMotorsMaintenanceStatusService.default();
  const motorsMaintenances = await listMotorsMaintenancesStatusService.execute({
    localUnit: Number(localUnit),
    localArea: Number(localArea),
    limit: Number(limit),
    offset: Number(offset)
  });
  return response.json(motorsMaintenances);
});
motorRouter.post('/', async (request, response) => {
  const createMotorService = new _CreateMotorService.default();
  const {
    type,
    power,
    localUnit,
    localArea
  } = request.body;
  const motor = await createMotorService.execute({
    type,
    power,
    localUnit,
    localArea
  });
  response.json(motor);
});
motorRouter.put('/:id', async (request, response) => {
  const updateMotorService = new _UpdateMotorService.default();
  const {
    id
  } = request.params;
  const {
    localUnit,
    localArea
  } = request.body;
  const motor = await updateMotorService.execute({
    id,
    localUnit,
    localArea
  });
  response.json(motor);
});
motorRouter.delete('/:id', async (request, response) => {
  const deleteMotorService = new _DeleteMotorService.default();
  const {
    id
  } = request.params;
  await deleteMotorService.execute(id);
  response.status(204).send();
});
var _default = motorRouter;
exports.default = _default;