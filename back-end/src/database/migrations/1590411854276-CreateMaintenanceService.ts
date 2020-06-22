import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMaintenanceService1590411854276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenances',
        columns: [
          {
            name: 'uuId',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'uuIdMotor',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'resistance30s',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'resistance60s',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'resistance10m',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'valueIP',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'valueIA',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenances');
  }
}
