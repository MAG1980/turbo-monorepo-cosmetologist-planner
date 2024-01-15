import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@server/trpc/trpc.router';
import { CreateTRPCProxyClient } from '@trpc/client/src/createTRPCClientProxy';

export const trpc: CreateTRPCProxyClient<AppRouter> =
  createTRPCProxyClient<AppRouter>({
    links: [
      //TODO: use env variable
      httpBatchLink({ url: `http://localhost:5000/trpc` }),
    ],
  });
