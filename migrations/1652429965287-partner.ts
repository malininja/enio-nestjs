import { MigrationInterface, QueryRunner } from 'typeorm';

export class partner1652429965287 implements MigrationInterface {
  name = 'partner1652429965287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "partner" ("id" SERIAL NOT NULL, "adresa" character varying, "mjesto" character varying, "naziv" character varying NOT NULL, "oib" character varying, "posta" character varying, "valuta" integer NOT NULL, "active" boolean NOT NULL, "firma_id" integer NOT NULL, "timestamp" character varying NOT NULL, CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD CONSTRAINT "FK_b944eab24205d59453831f1435d" FOREIGN KEY ("firma_id") REFERENCES "firma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner" DROP CONSTRAINT "FK_b944eab24205d59453831f1435d"`,
    );
    await queryRunner.query(`DROP TABLE "partner"`);
  }
}
