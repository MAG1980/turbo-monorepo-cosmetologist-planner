import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713804746615 implements MigrationInterface {
  name = 'M1713804746615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_procedure" ("order_id" int8 NOT NULL, "procedure_id" int8 NOT NULL, CONSTRAINT "PK_72fa94483e3553bfe7c864e2ab6" PRIMARY KEY ("order_id", "procedure_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_931c620e86bb58479aff37f0f6" ON "order_procedure" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aad02a6dc60e6c0f401467c662" ON "order_procedure" ("procedure_id") `,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "procedure_id"`);
    await queryRunner.query(
      `ALTER TABLE "order_procedure" ADD CONSTRAINT "fk_order_procedure" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_procedure" ADD CONSTRAINT "fk_procedure_order" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_procedure" DROP CONSTRAINT "fk_procedure_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_procedure" DROP CONSTRAINT "fk_order_procedure"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "procedure_id" int8 NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "order_procedure"@"IDX_aad02a6dc60e6c0f401467c662" CASCADE`,
    );
    await queryRunner.query(
      `DROP INDEX "order_procedure"@"IDX_931c620e86bb58479aff37f0f6" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "order_procedure"`);
  }
}
