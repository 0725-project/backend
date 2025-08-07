import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754545150879 implements MigrationInterface {
    name = 'Init1754545150879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" ADD "postCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" DROP COLUMN "postCount"`);
    }

}
