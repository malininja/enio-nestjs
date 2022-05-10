import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

const stage = process.env.STAGE || 'dev';
console.log(`Running migrations on "${stage}" environment`);
dotenv.config({ path: `.env.stage.${stage}` });

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
