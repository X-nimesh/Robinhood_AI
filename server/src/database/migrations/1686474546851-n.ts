import { MigrationInterface, QueryRunner } from "typeorm";

export class n1686474546851 implements MigrationInterface {
    name = 'n1686474546851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" RENAME COLUMN "desc" TO "purchase_date"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP COLUMN "purchase_date"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD "purchase_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP COLUMN "purchase_date"`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD "purchase_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" RENAME COLUMN "purchase_date" TO "desc"`);
    }

}
