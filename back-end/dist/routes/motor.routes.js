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
var express_1 = require("express");
var CreateMotorService_1 = __importDefault(require("../services/CreateMotorService"));
var DeleteMotorService_1 = __importDefault(require("../services/DeleteMotorService"));
var UpdateMotorService_1 = __importDefault(require("../services/UpdateMotorService"));
var ListMotorsMaintenanceStatusService_1 = __importDefault(require("../services/ListMotorsMaintenanceStatusService"));
var ListMotorService_1 = __importDefault(require("../services/ListMotorService"));
var motorRouter = express_1.Router();
motorRouter.get('/listmotor/:numId', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var numId, listMotorService, motor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                numId = request.params.numId;
                listMotorService = new ListMotorService_1.default();
                return [4 /*yield*/, listMotorService.execute(numId)];
            case 1:
                motor = _a.sent();
                return [2 /*return*/, response.json(motor)];
        }
    });
}); });
motorRouter.get('/maintenance', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, localUnit, localArea, limit, offset, listMotorsMaintenancesStatusService, motorsMaintenances;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.query, localUnit = _a.localUnit, localArea = _a.localArea, limit = _a.limit, offset = _a.offset;
                listMotorsMaintenancesStatusService = new ListMotorsMaintenanceStatusService_1.default();
                return [4 /*yield*/, listMotorsMaintenancesStatusService.execute({
                        localUnit: Number(localUnit),
                        localArea: Number(localArea),
                        limit: Number(limit),
                        offset: Number(offset),
                    })];
            case 1:
                motorsMaintenances = _b.sent();
                return [2 /*return*/, response.json(motorsMaintenances)];
        }
    });
}); });
motorRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var createMotorService, _a, type, power, localUnit, localArea, motor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                createMotorService = new CreateMotorService_1.default();
                _a = request.body, type = _a.type, power = _a.power, localUnit = _a.localUnit, localArea = _a.localArea;
                return [4 /*yield*/, createMotorService.execute({
                        type: type,
                        power: power,
                        localUnit: localUnit,
                        localArea: localArea,
                    })];
            case 1:
                motor = _b.sent();
                response.json(motor);
                return [2 /*return*/];
        }
    });
}); });
motorRouter.put('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var updateMotorService, id, _a, localUnit, localArea, motor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                updateMotorService = new UpdateMotorService_1.default();
                id = request.params.id;
                _a = request.body, localUnit = _a.localUnit, localArea = _a.localArea;
                return [4 /*yield*/, updateMotorService.execute({
                        id: id,
                        localUnit: localUnit,
                        localArea: localArea,
                    })];
            case 1:
                motor = _b.sent();
                response.json(motor);
                return [2 /*return*/];
        }
    });
}); });
motorRouter.delete('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteMotorService, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleteMotorService = new DeleteMotorService_1.default();
                id = request.params.id;
                return [4 /*yield*/, deleteMotorService.execute(id)];
            case 1:
                _a.sent();
                response.status(204).send();
                return [2 /*return*/];
        }
    });
}); });
exports.default = motorRouter;
