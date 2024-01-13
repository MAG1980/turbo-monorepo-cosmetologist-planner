import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const trpcRouter = app.get(TrpcRouter);
  await trpcRouter.applyMiddleware(app);
  await app.listen(5000);
}
bootstrap();
