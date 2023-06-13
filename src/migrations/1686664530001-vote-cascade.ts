import { MigrationInterface, QueryRunner } from "typeorm";

export class VoteCascade1686664530001 implements MigrationInterface {
    name = 'VoteCascade1686664530001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0bf940c4843f451d25475aae5b4"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_fee8b791157da492021c4c8fdb7"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0bf940c4843f451d25475aae5b4" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_fee8b791157da492021c4c8fdb7" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_fee8b791157da492021c4c8fdb7"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0bf940c4843f451d25475aae5b4"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_fee8b791157da492021c4c8fdb7" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0bf940c4843f451d25475aae5b4" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
