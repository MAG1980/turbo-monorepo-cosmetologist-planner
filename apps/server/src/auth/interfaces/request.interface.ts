import type { Request } from 'express';
export interface RequestInterface extends Request {
  user: { accessToken: string };
}
