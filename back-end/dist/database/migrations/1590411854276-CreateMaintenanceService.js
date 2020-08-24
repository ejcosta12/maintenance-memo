"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMaintenanceService1590411854276 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'maintenances',
      columns: [{
        name: 'uuId',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'uuIdMotor',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'resistance30s',
        type: 'real',
        isNullable: false
      }, {
        name: 'resistance60s',
        type: 'real',
        isNullable: false
      }, {
        name: 'resistance10m',
        type: 'real',
        isNullable: false
      }, {
        name: 'valueIP',
        type: 'real',
        isNullable: false
      }, {
        name: 'valueIA',
        type: 'real',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('maintenances');
  }

}

exports.default = CreateMaintenanceService1590411854276;