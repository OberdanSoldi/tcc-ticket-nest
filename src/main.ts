import { NestFactory } from '@nestjs/core';
import * as sendgridEmail from '@sendgrid/mail';
import { AppModule } from './usecase/module/app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
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

  sendgridEmail.setApiKey(process.env.EMAIL_API_SECRET);

  await app.listen(3005);
}

bootstrap();
