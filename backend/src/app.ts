import * as express from 'express';

import {BodyParser} from './api/middlewares/BodyParser';
import {HeroRouter} from './api/routes/HeroRouter';

export class App {
  private app: express.Application;

  constructor() {
    this.app = this.getExpressApp();
    this.useMiddleware();
    this.routes();
  }

  getExpressApp(): express.Application {
    return this.app || (this.app = express());
  }

  private useMiddleware(): void {
    BodyParser.middleware(this.app);
  }

  private routes(): void {
    this.app.use('/api/v1/heroes', new HeroRouter().router);
  }
}
