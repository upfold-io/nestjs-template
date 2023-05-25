"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = () => ({
    url: process.env.DATABASE_URL,
});
exports.databaseConfig = databaseConfig;
exports.default = (0, exports.databaseConfig)();
//# sourceMappingURL=database.js.map