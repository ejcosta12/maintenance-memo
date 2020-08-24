"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _motor = _interopRequireDefault(require("./motor.routes"));

var _maintenance = _interopRequireDefault(require("./maintenance.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/motors', _motor.default);
routes.use('/maintenance', _maintenance.default);
var _default = routes;
exports.default = _default;