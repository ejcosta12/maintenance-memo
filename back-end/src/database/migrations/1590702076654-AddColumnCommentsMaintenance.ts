import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnCommentsMaintenance1590702076654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('maintenances', new TableColumn({
      name: 'commentary',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('maintenances', 'commentary');
  }
}
