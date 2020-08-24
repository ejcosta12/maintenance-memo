"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMotorService1590411945538 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'motors',
      columns: [{
        name: 'uuId',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'numId',
        type: 'int',
        isNullable: false
      }, {
        name: 'type',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'power',
        type: 'real',
        isNullable: false
      }, {
        name: 'localUnit',
        type: 'integer',
        isNullable: false
      }, {
        name: 'localArea',
        type: 'integer',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('motors');
  }

}

exports.default = CreateMotorService1590411945538;