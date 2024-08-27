import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCompanyTypeTable1720716678201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'CompanyType',
        columns: [
          {
            name: 'idCompanyType',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'int',
          },
          {
            name: 'id_Company',
            type: 'int',
          },
        ],
      }),
    );

    queryRunner.createForeignKey(
      'CompanyType',
      new TableForeignKey({
        columnNames: ['id_Company'],
        referencedColumnNames: ['idCompany'],
        referencedTableName: 'Company',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('CompanyType');
  }
}
