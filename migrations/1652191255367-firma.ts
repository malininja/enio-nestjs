import { MigrationInterface, QueryRunner } from 'typeorm';

export class firma1652191255367 implements MigrationInterface {
  name = 'firma1652191255367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "firma" ("id" SERIAL NOT NULL, "aktivna_godina" integer NOT NULL, "adresa" character varying, "mjesto" character varying, "naziv" character varying NOT NULL, "oib" character varying(11) NOT NULL, "zr" character varying, "timestamp" character varying NOT NULL, CONSTRAINT "PK_a2393a2f4abdd19964f5f6a9387" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "firma"`);
  }
}
