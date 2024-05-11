import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PUBLIC_KEY = 'public';

//Декоратор добавляет метаданные {PUBLIC_KEY: true} в контекст контроллера или его метода, которые им декорированы.
export const Public = () => SetMetadata(PUBLIC_KEY, true);

//Проверка наличия маркера {PUBLIC_KEY: true} в метаданных текущего обработчика маршрута или его контроллера.
export const isPublic = (ctx: ExecutionContext, reflector: Reflector) => {
  //Получаем из рефлектора значения для указанного ключа (PUBLIC_KEY) для извлечённых из контекста целей (обработчика маршрута и его контроллера).
  return reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
    //Возвращает ссылку на обработчик (метод), который будет вызван следующим в конвейере запросов.
    ctx.getHandler(),
    // Возвращает тип класса контроллера, которому принадлежит этот обработчик.
    ctx.getClass(),
  ]);
};
