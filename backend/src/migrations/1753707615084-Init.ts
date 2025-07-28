import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753707615084 implements MigrationInterface {
    name = 'Init1753707615084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" ADD "postsId" integer`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_e75717e229192de9dfb7d3de35d"`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "creatorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "topicId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_e75717e229192de9dfb7d3de35d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_42e15f6c239bbc4b00960ef7a05" FOREIGN KEY ("postsId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_42e15f6c239bbc4b00960ef7a05"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_e75717e229192de9dfb7d3de35d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "topicId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "creatorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_e75717e229192de9dfb7d3de35d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "postsId"`);
    }

}
