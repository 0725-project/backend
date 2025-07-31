import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753934649732 implements MigrationInterface {
    name = 'Init1753934649732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "viewCount"`);
    }

}
