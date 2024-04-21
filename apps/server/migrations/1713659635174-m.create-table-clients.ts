import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1713659635174 implements MigrationInterface {
  name = 'M1713659635174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "clients_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" INT DEFAULT nextval('"clients_id_seq"') NOT NULL, "login" varchar NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, CONSTRAINT "UQ_a9170621bce4bd86ca626befa94" UNIQUE ("login"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_aa22377d7d3e794ae4cd39cd9e5" UNIQUE ("phone"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP SEQUENCE "clients_id_seq"`);
  }
}
