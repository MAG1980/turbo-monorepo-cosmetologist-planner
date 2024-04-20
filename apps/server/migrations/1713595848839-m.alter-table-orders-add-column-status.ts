import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713595848839 implements MigrationInterface {
  name = 'M1713595848839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('CREATED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'CREATED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
  }
}
