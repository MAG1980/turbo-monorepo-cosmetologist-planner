import { MigrationInterface, QueryRunner } from "typeorm";

export class M1713298851305 implements MigrationInterface {
    name = 'M1713298851305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."receptions_timeinterval_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`CREATE TABLE "receptions" ("date" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(), "timeInterval" "public"."receptions_timeinterval_enum" NOT NULL, "available" bool NOT NULL DEFAULT true, CONSTRAINT "receptions_time_pkey" PRIMARY KEY ("date", "timeInterval"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "receptions"`);
        await queryRunner.query(`DROP TYPE "public"."receptions_timeinterval_enum"`);
    }

}
