import helmet from 'helmet';

import {
  BadRequestException,
  ClassSerializerInterceptor,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiResponseInterceptor } from '@common/interceptors/api-response.interceptor';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Enable shutdown hooks so that Nest can gracefully close.
  app.enableShutdownHooks();

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, error) => {
          Object.values(error.constraints).forEach((errorMessage) => {
            acc.push({
              name: error.property,
              message: errorMessage,
            });
          });

          return acc;
        }, []);

        return new BadRequestException({
          message: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
          params: formattedErrors,
        });
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ApiResponseInterceptor(),
  );
  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    const openConfig = new DocumentBuilder()
      .setTitle('NestJS Starter')
      .setDescription('NestJS Starter API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, openConfig);
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
