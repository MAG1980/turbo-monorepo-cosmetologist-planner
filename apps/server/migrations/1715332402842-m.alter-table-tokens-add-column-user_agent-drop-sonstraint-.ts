import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1715332402842 implements MigrationInterface {
  name = 'M1715332402842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "user_agent" varchar NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "fk_tokens_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_id" SET NOT NULL`,
    );

    // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']::"public"."users_roles_enum"[]`);
    // await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "fk_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "fk_tokens_user_id"`);
    // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']`);

    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "fk_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "user_agent"`);
  }
}
