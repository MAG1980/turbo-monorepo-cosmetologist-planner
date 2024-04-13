import { MigrationInterface, QueryRunner } from "typeorm";

export class M1712971072341 implements MigrationInterface {
    name = 'M1712971072341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."receptions_timeinterval_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`CREATE SEQUENCE "receptions_id_seq"`);
        await queryRunner.query(`CREATE TABLE "receptions" ("id" INT DEFAULT nextval('"receptions_id_seq"') NOT NULL, "date" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(), "timeInterval" "public"."receptions_timeinterval_enum" NOT NULL, CONSTRAINT "PK_79571c06adcaae247f61366a240" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "receptions"`);
        await queryRunner.query(`DROP SEQUENCE "receptions_id_seq"`);
        await queryRunner.query(`DROP TYPE "public"."receptions_timeinterval_enum"`);
    }

}
