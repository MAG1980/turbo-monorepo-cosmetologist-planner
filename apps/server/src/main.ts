import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config({ path: '../../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cosmetologist planner')
    .setDescription('API for making an appointment with a cosmetologist')
    .setVersion('1.0')
    .addTag('receptions')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .addOAuth2()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(process.env.API_PORT || 5000);
}
bootstrap();
