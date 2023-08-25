import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmConfig = () => {
  const obj: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'project_share',
    // entities: [`dist/src/**/*.entity.{ts,js}`],
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../database/migrations/*.{ts,js}')],
    subscribers: [
      join(
        __dirname,
        `/../database/subscribers/typeorm-entity.subscriber.{ts,js}`,
      ),
    ],
    synchronize: true,
  };
  return obj;
};
