import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEmployeeTable1720471263659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'Employee',
        columns: [
          {
            name: 'idEmployee',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'department',
            type: 'char',
            length: '50',
          },
          {
            name: 'position',
            type: 'char',
            length: '50',
          },
          {
            name: 'email',
            type: 'char',
            length: '50',
            isNullable: true,
          },
          {
            name: 'deskphone',
            type: 'char',
            length: '20',
            isNullable: true,
          },
          {
            name: 'cellphone',
            type: 'char',
            length: '20',
            isNullable: true,
          },
          {
            name: 'id_Company',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    queryRunner.createForeignKey(
      'Employee',
      new TableForeignKey({
        columnNames: ['id_Company'],
        referencedColumnNames: ['idCompany'],
        referencedTableName: 'Company',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Employee');
  }
}
