import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1716345633949 implements MigrationInterface {
  name = 'M1716345633949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        ADD "is_active" bool NOT NULL DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "is_active"`);
  }
}
