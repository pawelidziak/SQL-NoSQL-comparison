import {Application} from 'express';
import {MongoRoutes} from './MongoRoutes';

export class AppRoutes {
  static generateRoutes(app: Application): void {
    app.use('/api/mongo', new MongoRoutes().router);
    // app.use('/api/mysql', new MySQLRoutes().router);
  }
}