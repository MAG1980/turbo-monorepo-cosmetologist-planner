import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713372480472 implements MigrationInterface {
  name = 'M1713372480472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."receptions_time_interval_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`,
    );
    await queryRunner.query(
      `CREATE TABLE "receptions" ("date" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(), "time_interval" "public"."receptions_time_interval_enum" NOT NULL, "available" bool NOT NULL DEFAULT true, CONSTRAINT "receptions_time_pkey" PRIMARY KEY ("date", "time_interval"))`,
    );
    await queryRunner.query(`CREATE SEQUENCE "orders_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" INT DEFAULT nextval('"orders_id_seq"') NOT NULL, "client_id" int8 NOT NULL, "service_id" int8 NOT NULL, "reception_date" timestamptz, "reception_time_interval" "public"."receptions_time_interval_enum", CONSTRAINT "REL_0f08b61b9a8781d882b4ac8f14" UNIQUE ("reception_date", "reception_time_interval"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f08b61b9a8781d882b4ac8f14" ON "orders" ("reception_date", "reception_time_interval") `,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_reception_time" FOREIGN KEY ("reception_date", "reception_time_interval") REFERENCES "receptions"("date","time_interval") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_reception_time"`,
    );
    await queryRunner.query(
      `DROP INDEX "orders"@"IDX_0f08b61b9a8781d882b4ac8f14" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP SEQUENCE "orders_id_seq"`);
    await queryRunner.query(`DROP TABLE "receptions"`);
    await queryRunner.query(
      `DROP TYPE "public"."receptions_time_interval_enum"`,
    );
  }
}
