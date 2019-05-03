import {Application} from 'express';
import {SurveyController} from './SurveyController';

export class AppRoutes {
  static DB_ROUTES = {
    createMany: '/createMany',
    readMany: '/readMany',
    readManyAsAll: '/readManyAsAll',
    updateMany: '/updateMany',
    deleteMany: '/deleteMany',
  };
  static generateRoutes(app: Application): void {
    app.use('/api', new SurveyController().router);
    // app.use('/api/mysql', new MySQLRoutes().router);
  }
}
