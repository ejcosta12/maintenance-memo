import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMotorService1590411945538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'motors',
        columns: [
          {
            name: 'uuId',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'numId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'power',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'localUnit',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'localArea',
            type: 'integer',
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
    await queryRunner.dropTable('motors');
  }
}
