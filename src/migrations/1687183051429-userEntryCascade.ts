import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntryCascade1687183051429 implements MigrationInterface {
  name = 'UserEntryCascade1687183051429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_f97b5030354ad848fd2b1fd9ab6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_f97b5030354ad848fd2b1fd9ab6" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_f97b5030354ad848fd2b1fd9ab6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_f97b5030354ad848fd2b1fd9ab6" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
