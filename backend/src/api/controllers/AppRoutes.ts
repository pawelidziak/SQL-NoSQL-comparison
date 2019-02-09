import {Application} from 'express';
import {MongoController} from './MongoController';

export class AppRoutes {
  static DB_ROUTES = {
    createMany: '/createMany',
    readMany: '/readMany',
    updateMany: '/updateMany',
    deleteMany: '/deleteMany',
  };
  static generateRoutes(app: Application): void {
    app.use('/api/mongo', new MongoController().router);
    // app.use('/api/mysql', new MySQLRoutes().router);
  }
}
