import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1753936590946 implements MigrationInterface {
    name = 'Init1753936590946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "nickname" character varying(32)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nickname"`)
    }
}
