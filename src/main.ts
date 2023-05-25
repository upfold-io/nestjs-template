import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable shutdown hooks so that Nest can gracefully close.
  app.enableShutdownHooks();

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // OpenAPI/Swagger configuration.
  const openConfig = new DocumentBuilder()
    .setTitle('NestJS Starter')
    .setDescription('NestJS Starter API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, openConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
