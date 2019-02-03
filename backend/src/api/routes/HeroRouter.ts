import {NextFunction, Request, Response, Router} from 'express';

export class HeroRouter {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  get router(): Router {
    return this._router;
  }

  private init(): void {
    this._router.get('/', HeroRouter.testRoute);
  }

  private static testRoute(req: Request, res: Response, next: NextFunction):
      void {
    res.send('Hello ExpressJS!');
  }
}
