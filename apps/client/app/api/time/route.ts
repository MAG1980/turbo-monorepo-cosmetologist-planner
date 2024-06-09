//Отключение кеширования
export const dynamic = "force-dynamic";
export function GET(_request: Request) {
  return Response.json({ time: new Date().toISOString() });
}
