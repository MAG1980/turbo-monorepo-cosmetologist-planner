import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1714825421065 implements MigrationInterface {
  name = 'M1714825421065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("token" varchar NOT NULL, "expiration" timestamptz NOT NULL, "user_id" int8, CONSTRAINT "PK_6a8ca5961656d13c16c04079dd3" PRIMARY KEY ("token"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8769073e38c365f315426554ca" ON "tokens" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_roles_enum" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" varchar NOT NULL DEFAULT 'password'`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a922b820eeef29ac1c6800e826" ON "orders" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "fk_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "fk_tokens_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "orders"@"IDX_a922b820eeef29ac1c6800e826" CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    await queryRunner.query(
      `DROP INDEX "tokens"@"IDX_8769073e38c365f315426554ca" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
