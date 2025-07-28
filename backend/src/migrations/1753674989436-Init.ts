import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753674989436 implements MigrationInterface {
    name = 'Init1753674989436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
