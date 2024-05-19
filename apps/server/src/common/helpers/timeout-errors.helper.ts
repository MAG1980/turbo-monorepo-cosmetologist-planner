import { catchError, Observable, timeout, TimeoutError } from 'rxjs';
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

/**
 * Обработчик ошибок и исчерпания времени.
 * Возвращает функцию, принимающую Observable и возвращающую Observable.
 * Функция выбрасывает исключения в зависимости от типа ошибки.
 */
export const handleTimeoutAndErrors = <T = unknown>() => {
  return (source$: Observable<T>) =>
    source$.pipe(
      timeout(5000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          throw new RequestTimeoutException();
        }
        throw new BadRequestException(error);
      }),
    );
};
