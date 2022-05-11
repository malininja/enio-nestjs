import { MigrationInterface, QueryRunner } from 'typeorm';

export class pdv1652257844494 implements MigrationInterface {
  name = 'pdv1652257844494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pdv" ("id" SERIAL NOT NULL, "naziv" character varying NOT NULL, "stopa" numeric(4,2) NOT NULL, "firma_id" integer NOT NULL, "timestamp" character varying NOT NULL, CONSTRAINT "PK_62ab763a2b52078f50819f49ef3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pdv" ADD CONSTRAINT "FK_9d344c99f6f01151fd35e50b048" FOREIGN KEY ("firma_id") REFERENCES "firma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pdv" DROP CONSTRAINT "FK_9d344c99f6f01151fd35e50b048"`,
    );
    await queryRunner.query(`DROP TABLE "pdv"`);
  }
}
