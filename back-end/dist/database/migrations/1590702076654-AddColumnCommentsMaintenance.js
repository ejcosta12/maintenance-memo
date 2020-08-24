"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddColumnCommentsMaintenance1590702076654 {
  async up(queryRunner) {
    await queryRunner.addColumn('maintenances', new _typeorm.TableColumn({
      name: 'commentary',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('maintenances', 'commentary');
  }

}

exports.default = AddColumnCommentsMaintenance1590702076654;