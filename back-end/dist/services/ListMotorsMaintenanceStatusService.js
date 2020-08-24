"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var date_fns_1 = require("date-fns");
var Motor_1 = __importDefault(require("../models/Motor"));
var Maintenance_1 = __importDefault(require("../models/Maintenance"));
var ListMotorsMaintenanceStatusService = /** @class */ (function () {
    function ListMotorsMaintenanceStatusService() {
    }
    ListMotorsMaintenanceStatusService.prototype.execute = function (_a) {
        var localUnit = _a.localUnit, localArea = _a.localArea, limit = _a.limit, offset = _a.offset;
        return __awaiter(this, void 0, void 0, function () {
            var motorsRepository, maintenancesRepository, maintenances, motors, motorsMaintenances, quantityTotal, count_1, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        motorsRepository = typeorm_1.getRepository(Motor_1.default);
                        maintenancesRepository = typeorm_1.getRepository(Maintenance_1.default);
                        return [4 /*yield*/, maintenancesRepository.find()];
                    case 1:
                        maintenances = _b.sent();
                        return [4 /*yield*/, motorsRepository.find()];
                    case 2:
                        motors = _b.sent();
                        motorsMaintenances = motors.map(function (motor) {
                            var maintenancesMotor = maintenances
                                .filter(function (maintenance) { return maintenance.motor_uuid === motor.uuId; });
                            var lastDateMaintenance = date_fns_1.max(maintenancesMotor
                                .map(function (maintenance) { return maintenance.created_at; }));
                            var lastMaintenanceMotor = maintenancesMotor
                                .find(function (maintenance) { return date_fns_1.isEqual(maintenance.created_at, lastDateMaintenance); });
                            return ({
                                uuIdMotor: motor.uuId,
                                numIdMotor: motor.numId,
                                lastValueIP: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.valueIP) || 0,
                                lastValueIA: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.valueIA) || 0,
                                dateLastMaintenance: (lastMaintenanceMotor === null || lastMaintenanceMotor === void 0 ? void 0 : lastMaintenanceMotor.created_at) || 0,
                                localUnit: motor.localUnit,
                                localArea: motor.localArea,
                            });
                        });
                        if (localUnit) {
                            motorsMaintenances = motorsMaintenances.filter(function (motor) { return motor.localUnit === localUnit; });
                            if (localArea) {
                                motorsMaintenances = motorsMaintenances.filter(function (motor) { return motor.localArea === localArea; });
                            }
                        }
                        motorsMaintenances.sort(function (motorA, motorB) { return ((motorA.lastValueIA + motorA.lastValueIP) / 2)
                            - ((motorB.lastValueIA + motorB.lastValueIP) / 2); });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIA < 1.25) {
                                return -1;
                            }
                            if (motorB.lastValueIA < 1.25) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIP < 2) {
                                return -1;
                            }
                            if (motorB.lastValueIP < 2) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIA < 1.1) {
                                return -1;
                            }
                            if (motorB.lastValueIA < 1.1) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIP < 1.5) {
                                return -1;
                            }
                            if (motorB.lastValueIP < 1.5) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIA < 1) {
                                return -1;
                            }
                            if (motorB.lastValueIA < 1) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            if (motorA.lastValueIP < 1) {
                                return -1;
                            }
                            if (motorB.lastValueIP < 1) {
                                return 1;
                            }
                            return 0;
                        });
                        motorsMaintenances.sort(function (motorA, motorB) {
                            var aDurationInMonths = date_fns_1.differenceInMonths(new Date(), motorA.dateLastMaintenance);
                            var bDurationInMonths = date_fns_1.differenceInMonths(new Date(), motorB.dateLastMaintenance);
                            if (aDurationInMonths > 6 || motorA.dateLastMaintenance === 0) {
                                return -1;
                            }
                            if (bDurationInMonths > 6 || motorB.dateLastMaintenance === 0) {
                                return 1;
                            }
                            return 0;
                        });
                        quantityTotal = motorsMaintenances.length;
                        if (limit >= 0 && offset >= 0) {
                            count_1 = 0;
                            motorsMaintenances = motorsMaintenances.filter(function (motor, index) {
                                if (index >= offset && count_1 < limit) {
                                    count_1 += 1;
                                    return motor;
                                }
                                return false;
                            });
                        }
                        response = {
                            quantityTotal: quantityTotal,
                            motorsMaintenances: motorsMaintenances,
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return ListMotorsMaintenanceStatusService;
}());
exports.default = ListMotorsMaintenanceStatusService;