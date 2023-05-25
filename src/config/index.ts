import { databaseConfig } from './database';

interface IConfig {
  database: ReturnType<typeof databaseConfig>;
}

export default (): Partial<IConfig> => ({
  database: databaseConfig(),
});
