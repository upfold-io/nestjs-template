import { databaseConfig } from './database';
interface IConfig {
    database: ReturnType<typeof databaseConfig>;
}
declare const _default: () => Partial<IConfig>;
export default _default;
