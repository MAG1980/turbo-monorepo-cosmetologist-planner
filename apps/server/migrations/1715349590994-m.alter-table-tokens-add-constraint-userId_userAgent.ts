import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1715349590994 implements MigrationInterface {
  name = 'M1715349590994';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']::"public"."users_roles_enum"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "UQ_tokens_userId_userAgent" UNIQUE ("user_id", "user_agent")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "tokens"@"UQ_tokens_userId_userAgent" CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']`,
    );
  }
}
