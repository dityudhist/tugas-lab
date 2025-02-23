import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: "*"
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Backend 5D')
    .setDescription('105841114122')
    .setVersion('0.1')
    .addTag('Kelas D')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
