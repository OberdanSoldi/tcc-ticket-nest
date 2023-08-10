import { NestFactory } from '@nestjs/core';
import { AppModule } from './usecase/module/app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const swaggerOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const swaggerConfig = new DocumentBuilder()

    .setTitle('Ticket API')
    .setDescription('The Ticket API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
