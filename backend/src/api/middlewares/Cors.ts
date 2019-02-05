import * as cors from 'cors';
import {Application} from 'express';

export class Cors {
  constructor() {}

  static middleware(app: Application): void {
    app.use(cors());
  }
}
