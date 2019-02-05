import {Handler, Request, Response} from 'express';
import {NextFunction} from 'express-serve-static-core';

export class AsyncMiddleware {
  static myAsync(fn: Handler) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
