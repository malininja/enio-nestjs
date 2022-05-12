import { MigrationInterface, QueryRunner } from 'typeorm';

export class artikl1652344793885 implements MigrationInterface {
  name = 'artikl1652344793885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artikl" ("id" SERIAL NOT NULL, "naziv" character varying NOT NULL, "jm" character varying NOT NULL, "cijena" numeric(10,2) NOT NULL, "active" boolean NOT NULL, "pdv_id" integer NOT NULL, "firma_id" integer NOT NULL, "timestamp" character varying NOT NULL, CONSTRAINT "PK_8fb27bd681d8bed929d065f811b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "artikl" ADD CONSTRAINT "FK_dc236883b448f6b00fd0b49e010" FOREIGN KEY ("pdv_id") REFERENCES "pdv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artikl" ADD CONSTRAINT "FK_6767a97f4473aab4fe387ce423d" FOREIGN KEY ("firma_id") REFERENCES "firma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artikl" DROP CONSTRAINT "FK_6767a97f4473aab4fe387ce423d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artikl" DROP CONSTRAINT "FK_dc236883b448f6b00fd0b49e010"`,
    );
    await queryRunner.query(`DROP TABLE "artikl"`);
  }
}
