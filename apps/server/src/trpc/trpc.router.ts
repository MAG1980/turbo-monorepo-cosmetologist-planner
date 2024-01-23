import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService) {}

  //Раскрывает методы, доступные клиенту для вызова
  appRouter = this.trpcService.router({
    hello: this.trpcService.procedure
      //Ограничивает тип полезной нагрузки, получаемой из клиента
      //(метод hello имеет необязательный параметр (объект, содержащий поле name)
      .input(
        z
          .object({
            name: z.string(),
          })
          .optional(),
      )
      .query(({ input }) => {
        //В реальных проектах здесь происходит вызов сервиса
        return `Hello, ${input?.name || 'Bilbo'}!`;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    //Внутренние маршруты
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

//Содержит типы всех методов маршрутизатора приложения, полученные путём вывода
//Экспорт типа для использования в клиенте
export type AppRouter = TrpcRouter['appRouter'];
