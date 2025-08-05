import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754401128588 implements MigrationInterface {
    name = 'Init1754401128588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" ADD "name" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "UQ_1304b1c61016e63f60cd147ce6b" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "UQ_1304b1c61016e63f60cd147ce6b"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP COLUMN "name"`);
    }

}
