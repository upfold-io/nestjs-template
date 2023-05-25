"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    const openConfig = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Starter')
        .setDescription('NestJS Starter API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, openConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map