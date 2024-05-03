import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1714746129813 implements MigrationInterface {
  name = 'M1714746129813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "client_id" TO "user_id"`,
    );
    await queryRunner.query(`ALTER TABLE "clients" RENAME TO "users";`);
    await queryRunner.query(
      `ALTER SEQUENCE "clients_id_seq" RENAME TO "users_id_seq";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER SEQUENCE "users_id_seq" RENAME TO "clients_id_seq";`,
    );
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "clients";`);
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "user_id" TO "client_id"`,
    );
  }
}
