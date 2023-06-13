import { MigrationInterface, QueryRunner } from 'typeorm';

export class VoteUnique1686663492455 implements MigrationInterface {
  name = 'VoteUnique1686663492455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vote" ADD CONSTRAINT "UQ_f02aed416a5d10ab42de6641722" UNIQUE ("entryId", "createdById")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vote" DROP CONSTRAINT "UQ_f02aed416a5d10ab42de6641722"`,
    );
  }
}
