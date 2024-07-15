import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjectTable1720647957624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Project');
  }
}
