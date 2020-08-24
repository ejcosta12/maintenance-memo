"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var motor_routes_1 = __importDefault(require("./motor.routes"));
var maintenance_routes_1 = __importDefault(require("./maintenance.routes"));
var routes = express_1.Router();
routes.use('/motors', motor_routes_1.default);
routes.use('/maintenance', maintenance_routes_1.default);
exports.default = routes;
