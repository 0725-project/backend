import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1754880078359 implements MigrationInterface {
    name = 'Init1754880078359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "favorite_topics" ("id" SERIAL NOT NULL, "userId" integer, "topicId" integer, CONSTRAINT "UQ_0582ce21ba14ac30f78c61e78b0" UNIQUE ("userId", "topicId"), CONSTRAINT "PK_618f9a1132cfb25ad1d12eb41a4" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(`ALTER TABLE "posts" ADD "likesId" integer`)
        await queryRunner.query(
            `ALTER TABLE "favorite_topics" ADD CONSTRAINT "FK_0169d16f5ecfc0fa4ddffb580a9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "favorite_topics" ADD CONSTRAINT "FK_c8ab193092216284d91772764fb" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "posts" ADD CONSTRAINT "FK_5497a85000a53c152b3432e75c3" FOREIGN KEY ("likesId") REFERENCES "likes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_5497a85000a53c152b3432e75c3"`)
        await queryRunner.query(`ALTER TABLE "favorite_topics" DROP CONSTRAINT "FK_c8ab193092216284d91772764fb"`)
        await queryRunner.query(`ALTER TABLE "favorite_topics" DROP CONSTRAINT "FK_0169d16f5ecfc0fa4ddffb580a9"`)
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likesId"`)
        await queryRunner.query(`DROP TABLE "favorite_topics"`)
    }
}
