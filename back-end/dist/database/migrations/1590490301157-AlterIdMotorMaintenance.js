"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterIdMotorMaintenance1590490301157 {
  async up(queryRunner) {
    await queryRunner.dropColumn('maintenances', 'uuIdMotor');
    await queryRunner.addColumn('maintenances', new _typeorm.TableColumn({
      name: 'motor_uuid',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('maintenances', new _typeorm.TableForeignKey({
      name: 'motor_maintenance',
      columnNames: ['motor_uuid'],
      referencedColumnNames: ['uuId'],
      referencedTableName: 'motors',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('maintenances', 'motor_maintenance');
    await queryRunner.dropColumn('maintenances', 'motor_uuid');
    await queryRunner.addColumn('maintenances', new _typeorm.TableColumn({
      name: 'uuIdMotor',
      type: 'uuid',
      isNullable: true
    }));
  }

}

exports.default = AlterIdMotorMaintenance1590490301157;