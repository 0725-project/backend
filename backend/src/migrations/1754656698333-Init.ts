import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1754656698333 implements MigrationInterface {
    name = 'Init1754656698333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImage" character varying(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImage"`)
    }
}
