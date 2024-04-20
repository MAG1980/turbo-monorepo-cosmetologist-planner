import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713647350078 implements MigrationInterface {
  name = 'M1713647350078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "service_id" TO "procedure_id"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."procedures_name_enum" AS ENUM('Инъекция ботокса', 'РФ лифтинг', 'Мезотерапия', 'Пилинг', 'Массаж лица', 'filler injection')`,
    );
    await queryRunner.query(`CREATE SEQUENCE "procedures_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "procedures" ("id" INT DEFAULT nextval('"procedures_id_seq"') NOT NULL, "name" "public"."procedures_name_enum" NOT NULL, "price" int8 NOT NULL, CONSTRAINT "UQ_81aed255688030b862c218124b4" UNIQUE ("name"), CONSTRAINT "PK_e7775bab78f27b4c47580b6cb4b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "procedures"`);
    await queryRunner.query(`DROP SEQUENCE "procedures_id_seq"`);
    await queryRunner.query(`DROP TYPE "public"."procedures_name_enum"`);
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "procedure_id" TO "service_id"`,
    );
  }
}
