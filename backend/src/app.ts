import * as express from 'express';

import {BodyParser} from './api/middlewares/BodyParser';
import {MongoRoutes} from './api/routes/MongoRoutes';
import {Mongo} from './db/mongo/mongo';

export class App {
  private app: express.Application;

  constructor() {
    this.app = this.getExpressApp();
    const mongo = new Mongo();
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
    this.app.use('/api/v1/heroes', new MongoRoutes().router);
  }
}
