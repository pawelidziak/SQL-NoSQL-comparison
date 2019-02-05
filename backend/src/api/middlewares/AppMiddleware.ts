import {Application} from 'express';
import {BodyParser} from './BodyParser';
import {Cors} from './Cors';

export class AppMiddleware {
  static generateMiddleware(app: Application): void {
    BodyParser.middleware(app);
    Cors.middleware(app);
  }
}