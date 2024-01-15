import { trpc } from "@client/app/trpc";

export const ServerSide = async () => {
  const response = await trpc.hello.query({ name: 'Test' })
  return <h1>{ response }</h1>
}