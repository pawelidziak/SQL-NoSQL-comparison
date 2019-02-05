import {Router} from 'express';
import {ParentServiceImpl} from '../../infrastructure/services/ParentServiceImpl';
import {AsyncMiddleware} from '../middlewares/AsyncMiddleware';

export class MongoRoutes {
  private readonly _router: Router;
  private parentService: ParentServiceImpl;

  constructor() {
    this.parentService = new ParentServiceImpl();
    this._router = Router();
    this.init();
  }

  get router(): Router {
    return this._router;
  }

  private init(): void {
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

  /* GET all parents */
  private getAll(): void {
    this._router.get(
        '/parents', AsyncMiddleware.myAsync(async (req, res, next) => {
          const parents = await this.parentService.getAllParents();
          res.json(parents);
        }));
  }

  /* POST one parent */
  private postOne(): void {
    this._router.post(
        '/parents', AsyncMiddleware.myAsync(async (req, res, next) => {
          const parent = await this.parentService.createParent(req.body);
          res.json(parent);
        }));
  }
}