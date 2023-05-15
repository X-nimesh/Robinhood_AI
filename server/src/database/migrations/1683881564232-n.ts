import { MigrationInterface, QueryRunner } from "typeorm";

export class n1683881564232 implements MigrationInterface {
    name = 'n1683881564232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "desc" character varying NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio_stocks" ("id" SERIAL NOT NULL, "stock_name" character varying NOT NULL, "desc" character varying NOT NULL, "portfolio_id" integer NOT NULL, "purchase_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_d8b5eece766e5843d05955f50eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD CONSTRAINT "FK_7fbe08bfd9cd55e71e4381ead04" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP CONSTRAINT "FK_7fbe08bfd9cd55e71e4381ead04"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_89055af4a272bb99a3d3ed2f247"`);
        await queryRunner.query(`DROP TABLE "portfolio_stocks"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
