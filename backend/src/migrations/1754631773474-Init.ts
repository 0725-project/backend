import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1754631773474 implements MigrationInterface {
    name = 'Init1754631773474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1')`)
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT '1'`)
        await queryRunner.query(`ALTER TABLE "users" ADD "points" integer NOT NULL DEFAULT '0'`)
        await queryRunner.query(`ALTER TABLE "users" ADD "postCount" integer NOT NULL DEFAULT '0'`)
        await queryRunner.query(`ALTER TABLE "users" ADD "commentCount" integer NOT NULL DEFAULT '0'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "commentCount"`)
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postCount"`)
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`)
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`)
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
    }
}
