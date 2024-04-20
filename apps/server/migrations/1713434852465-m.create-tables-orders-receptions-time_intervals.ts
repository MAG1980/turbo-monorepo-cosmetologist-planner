import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713434852465 implements MigrationInterface {
  name = 'M1713434852465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "receptions" ("date" date NOT NULL, "time_interval_id" int8 NOT NULL, "available" bool NOT NULL DEFAULT true, CONSTRAINT "receptions_time_pkey" PRIMARY KEY ("date", "time_interval_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb64f333eca7b9e8ea81592be3" ON "receptions" ("time_interval_id") `,
    );
    await queryRunner.query(`CREATE SEQUENCE "time_intervals_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "time_intervals" ("id" INT DEFAULT nextval('"time_intervals_id_seq"') NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_fffce50f6f61302ba1c05c70eda" UNIQUE ("name"), CONSTRAINT "PK_c26261cfeb0a4e7b9301006c8b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE SEQUENCE "orders_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" INT DEFAULT nextval('"orders_id_seq"') NOT NULL, "client_id" int8 NOT NULL, "service_id" int8 NOT NULL, "reception_date" date, "reception_time_interval_id" int8, CONSTRAINT "REL_591142e0c32a89c0c26ca671ce" UNIQUE ("reception_date", "reception_time_interval_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_591142e0c32a89c0c26ca671ce" ON "orders" ("reception_date", "reception_time_interval_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "receptions" ADD CONSTRAINT "fk_time_interval_id" FOREIGN KEY ("time_interval_id") REFERENCES "time_intervals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_reception_time" FOREIGN KEY ("reception_date", "reception_time_interval_id") REFERENCES "receptions"("date","time_interval_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_reception_time"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receptions" DROP CONSTRAINT "fk_time_interval_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "orders"@"IDX_591142e0c32a89c0c26ca671ce" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP SEQUENCE "orders_id_seq"`);
    await queryRunner.query(`DROP TABLE "time_intervals"`);
    await queryRunner.query(`DROP SEQUENCE "time_intervals_id_seq"`);
    await queryRunner.query(
      `DROP INDEX "receptions"@"IDX_fb64f333eca7b9e8ea81592be3" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "receptions"`);
  }
}
