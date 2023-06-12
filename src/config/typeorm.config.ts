import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '.';

const options: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  host: config.database.host,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  ssl: config.database.ssl,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};

export const databaseConfig: TypeOrmModuleOptions = {
  ...options,
  synchronize: config.database.synchronize,
  autoLoadEntities: true,
};

const dataSource = new DataSource(options);

export default dataSource;
