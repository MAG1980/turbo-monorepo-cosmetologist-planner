import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@server/trpc/trpc.router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    //TODO: use env variable
    httpBatchLink({ url: `http://localhost:5000/trpc` }),
  ],
});
