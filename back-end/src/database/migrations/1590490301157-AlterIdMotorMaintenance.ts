import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterIdMotorMaintenance1590490301157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('maintenances', 'uuIdMotor');

    await queryRunner.addColumn('maintenances', new TableColumn({
      name: 'motor_uuid',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('maintenances', new TableForeignKey({
      name: 'motor_maintenance',
      columnNames: ['motor_uuid'],
      referencedColumnNames: ['uuId'],
      referencedTableName: 'motors',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('maintenances', 'motor_maintenance');

    await queryRunner.dropColumn('maintenances', 'motor_uuid');

    await queryRunner.addColumn('maintenances', new TableColumn({
      name: 'uuIdMotor',
      type: 'uuid',
      isNullable: true,
    }));
  }
}
