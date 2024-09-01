import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProjectTable1720647957624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Project',
        columns: [
          {
            name: 'idProject',
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
            name: 'code',
            type: 'char',
            length: '15',
          },
          {
            name: 'product',
            type: 'char',
            length: '20',
          },
          {
            name: 'startOfProduction',
            type: 'timestamp',
          },
          {
            name: 'id_Company',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Project',
      new TableForeignKey({
        columnNames: ['id_Company'],
        referencedColumnNames: ['idCompany'],
        referencedTableName: 'Company',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Project');
  }
}
