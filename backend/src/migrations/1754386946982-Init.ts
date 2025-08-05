import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1754386946982 implements MigrationInterface {
    name = 'Init1754386946982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`)
    }
}
