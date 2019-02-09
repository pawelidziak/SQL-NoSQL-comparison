import {Request, Response, Router} from 'express';
import {NextFunction} from 'express-serve-static-core';

import {RequestModel} from '../../core/models/RequestModel';
import {SurveyResult} from '../../core/models/SurveyResult';
import {SurveyService} from '../../infrastructure/services/SurveyService';

import {AppRoutes} from './AppRoutes';

export class MongoController {
  private _router: Router = Router();

  private newService: SurveyService;

  constructor() {
    this.newService = new SurveyService();
    this.init();
  }

  get router(): Router {
    return this._router;
  }

  init() {
    // Create
    this._router.get(
        AppRoutes.DB_ROUTES.createMany,
        (req: Request, res: Response, next: NextFunction) => {
          this.createMany(req, res, next);
        });
  }

  private createMany(req: Request, res: Response, next: NextFunction) {
    this.newService.surveyCreate(req.body as RequestModel)
        .then((result: SurveyResult) => res.json(result))
        .catch((err: Error) => res.status(404).send('createMany ERROR'));
  }
}
