import { MigrationInterface, QueryRunner } from "typeorm";

export class n1686217881878 implements MigrationInterface {
    name = 'n1686217881878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" RENAME COLUMN "stock_name" TO "stock_id"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP COLUMN "stock_id"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD "stock_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD CONSTRAINT "FK_0276b1336ae3b88c8ee97ff10c2" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP CONSTRAINT "FK_0276b1336ae3b88c8ee97ff10c2"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP COLUMN "stock_id"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD "stock_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" RENAME COLUMN "stock_id" TO "stock_name"`);
    }

}
