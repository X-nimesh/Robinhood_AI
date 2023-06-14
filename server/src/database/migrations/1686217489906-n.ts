import { MigrationInterface, QueryRunner } from "typeorm";

export class n1686217489906 implements MigrationInterface {
    name = 'n1686217489906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_stocks" DROP COLUMN "quantity"`);
    }

}
