import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanyTable1718214462553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Company',
        columns: [
          {
            name: 'idCompany',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'type',
            type: 'int',
          },
          {
            name: 'nickname',
            type: 'char',
            length: '50',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'cnpj',
            type: 'char',
            length: '20',
            isNullable: true,
          },
          {
            name: 'ie',
            type: 'char',
            length: '50',
            isNullable: true,
          },
          {
            name: 'im',
            type: 'char',
            length: '50',
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Company');
  }
}
