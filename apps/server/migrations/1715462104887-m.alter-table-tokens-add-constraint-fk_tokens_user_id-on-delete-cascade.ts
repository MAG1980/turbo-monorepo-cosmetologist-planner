import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1715462104887 implements MigrationInterface {
  name = 'M1715462104887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "fk_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "fk_tokens_user_id"`,
    );
  }
}
