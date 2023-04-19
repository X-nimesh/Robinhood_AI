import { MigrationInterface, QueryRunner } from "typeorm";

export class n1679973555821 implements MigrationInterface {
    name = 'n1679973555821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
