import { typeOrmConfig } from 'src/config/database.config';
import { DataSource } from 'typeorm';

export default new DataSource(typeOrmConfig());
