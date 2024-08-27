import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAdressTable1720647166251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'Address',
        columns: [
          {
            name: 'idAdress',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'char',
            length: '50',
          },
          {
            name: 'address',
            type: 'char',
            length: '150',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'complement',
            type: 'char',
            length: '50',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'char',
            length: '50',
          },
          {
            name: 'city',
            type: 'char',
            length: '50',
          },
          {
            name: 'state',
            type: 'char',
            length: '20',
          },
          {
            name: 'id_Company',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'id_Employee',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    queryRunner.createForeignKey(
      'Address',
      new TableForeignKey({
        columnNames: ['id_Company'],
        referencedColumnNames: ['idCompany'],
        referencedTableName: 'Company',
        onDelete: 'CASCADE',
      }),
    );

    queryRunner.createForeignKey(
      'Address',
      new TableForeignKey({
        columnNames: ['id_Employee'],
        referencedColumnNames: ['idEmployee'],
        referencedTableName: 'Employee',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Address');
  }
}
