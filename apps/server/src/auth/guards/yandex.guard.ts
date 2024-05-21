import { AuthGuard } from '@nestjs/passport';

//Для создания guard для стратегии в качестве type передаем имя стратегии
export class YandexGuard extends AuthGuard('yandex') {}
