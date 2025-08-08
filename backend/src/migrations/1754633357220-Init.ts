import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1754633357220 implements MigrationInterface {
    name = 'Init1754633357220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "description" character varying(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`)
    }
}
