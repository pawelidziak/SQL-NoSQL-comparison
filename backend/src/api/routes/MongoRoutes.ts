import {Router} from 'express';

import {Mongo} from '../../db/mongo/mongo';
import {ParentServiceImpl} from '../../infrastructure/services/ParentServiceImpl';
import {AsyncMiddleware} from '../middlewares/AsyncMiddleware';

export class MongoRoutes {
  private readonly _router: Router;
  private parentService: ParentServiceImpl;
  private mongoDb: Mongo;

  constructor() {
    this.parentService = new ParentServiceImpl();
    this.mongoDb = new Mongo();
    this._router = Router();
    this.init();
  }

  get router(): Router {
    return this._router;
  }

  private init(): void {
    this.connectMongo();
    this.getAll();
    this.postOne();
  }

  /**
   *    METHODS
   *
   *    if there is an error thrown in parentService.** method,
   *    AsyncMiddleware.myAsync will pass it to next() and express will
   *    handle the error;
   */
  private connectMongo(): void {
    this._router.get('/', AsyncMiddleware.myAsync(async (req, res, next) => {
      await this.mongoDb.connect();
      const isConnected = await this.mongoDb.isConnected();
      res.json({isConnected});
    }));
  }

  /* GET all parents */
  private getAll(): void {
    this._router.get(
        '/parents', AsyncMiddleware.myAsync(async (req, res, next) => {
          const parents = await this.parentService.getAllParents();
          res.json(parents);
        }));
  }

  /* POST one parent */
  // nie post ONE a MANY, w argumencie przesylamy liczbe, laczymy sie z serwisem
  // ktory generuje LICZBE rekordów, rozpoczyna pomiar, wstawia je i zwraca
  // {czas, db, operation, liczbe}
  private postOne(): void {
    this._router.post(
        '/parents', AsyncMiddleware.myAsync(async (req, res, next) => {
          const parent = await this.parentService.createParent(req.body);
          res.json(parent);
        }));
  }
}