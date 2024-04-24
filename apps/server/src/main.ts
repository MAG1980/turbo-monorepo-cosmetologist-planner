import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const trpcRouter = app.get(TrpcRouter);
  await trpcRouter.applyMiddleware(app);

  const config = new DocumentBuilder()
    .setTitle('Cosmetologist planner')
    .setDescription('API for making an appointment with a cosmetologist')
    .setVersion('1.0')
    .addTag('receptions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
