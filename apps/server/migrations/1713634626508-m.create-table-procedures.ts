import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713634626508 implements MigrationInterface {
  name = 'M1713634626508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."procedures_name_enum" AS ENUM('Инъекция ботокса', 'РФ лифтинг', 'Мезотерапия', 'Пилинг', 'Массаж лица', 'filler injection')`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedures" ("name" "public"."procedures_name_enum" NOT NULL, "price" int8 NOT NULL, CONSTRAINT "PK_81aed255688030b862c218124b4" PRIMARY KEY ("name"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "procedures"`);
    await queryRunner.query(`DROP TYPE "public"."procedures_name_enum"`);
  }
}
