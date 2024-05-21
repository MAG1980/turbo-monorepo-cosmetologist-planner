import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1716335172129 implements MigrationInterface {
  name = 'M1716335172129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "users"@"UQ_a9170621bce4bd86ca626befa94" CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "login"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "login" varchar`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_a9170621bce4bd86ca626befa94" UNIQUE ("login")`,
    );
  }
}
