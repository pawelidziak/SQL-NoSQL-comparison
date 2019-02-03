import * as bodyParser from 'body-parser';
import {Application} from 'express';

export class BodyParser {
  constructor() {}

  static middleware(app: Application): void {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
  }
}
