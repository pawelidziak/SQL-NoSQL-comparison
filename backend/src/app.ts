import * as express from 'express';

import {AppRoutes} from './api/controllers/AppRoutes';
import {AppMiddleware} from './api/middlewares/AppMiddleware';

export class App {
  private app: express.Application;

  constructor() {
    this.app = this.getExpressApp();
    AppMiddleware.generateMiddleware(this.app);
    AppRoutes.generateRoutes(this.app);
  }

  getExpressApp(): express.Application {
    return this.app || (this.app = express());
  }
}
