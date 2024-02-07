import { MigrationInterface, QueryRunner } from "typeorm";

export class M1707273508467 implements MigrationInterface {
    name = 'M1707273508467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "dates_id_seq"`);
        await queryRunner.query(`CREATE TABLE "dates" ("id" INT DEFAULT nextval('"dates_id_seq"') NOT NULL, "timestampWithTimezone" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(), "available" bool NOT NULL, CONSTRAINT "PK_401724822174c3539ee7036da15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."time_slots_interval_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`CREATE SEQUENCE "time_slots_id_seq"`);
        await queryRunner.query(`CREATE TABLE "time_slots" ("id" INT DEFAULT nextval('"time_slots_id_seq"') NOT NULL, "interval" "public"."time_slots_interval_enum" NOT NULL DEFAULT '0', "available" bool NOT NULL, "date_id" int8, CONSTRAINT "PK_f87c73d8648c3f3f297adba3cb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_daace92a9afca15dcb32eda14e" ON "time_slots" ("date_id") `);
        await queryRunner.query(`ALTER TABLE "time_slots" ADD CONSTRAINT "FK_daace92a9afca15dcb32eda14ea" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_slots" DROP CONSTRAINT "FK_daace92a9afca15dcb32eda14ea"`);
        await queryRunner.query(`DROP INDEX "time_slots"@"IDX_daace92a9afca15dcb32eda14e" CASCADE`);
        await queryRunner.query(`DROP TABLE "time_slots"`);
        await queryRunner.query(`DROP SEQUENCE "time_slots_id_seq"`);
        await queryRunner.query(`DROP TYPE "public"."time_slots_interval_enum"`);
        await queryRunner.query(`DROP TABLE "dates"`);
        await queryRunner.query(`DROP SEQUENCE "dates_id_seq"`);
    }

}
