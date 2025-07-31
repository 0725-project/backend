import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1753935655048 implements MigrationInterface {
    name = 'Init1753935655048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "ip" character varying(15)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "ip"`)
    }
}
