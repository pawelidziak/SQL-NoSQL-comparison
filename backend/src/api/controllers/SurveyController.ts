import {Request, Response, Router} from 'express';
import {NextFunction} from 'express-serve-static-core';

import {RequestModel} from '../../core/models/RequestModel';
import {SurveyResult} from '../../core/models/SurveyResult';
import {SurveyService} from '../../infrastructure/services/SurveyService';

import {AppRoutes} from './AppRoutes';

export class SurveyController {
  private _router: Router = Router();

  private surveyService: SurveyService;

  constructor() {
    this.surveyService = new SurveyService();
    this.init();
  }

  get router(): Router {
    return this._router;
  }

  init() {
    // Create
    this._router.post(
        AppRoutes.DB_ROUTES.createMany,
        (req: Request, res: Response, next: NextFunction) => {
          this.createMany(req, res, next);
        });

    // Read
    this._router.post(
        AppRoutes.DB_ROUTES.readMany,
        (req: Request, res: Response, next: NextFunction) => {
          this.readMany(req, res, next);
        });

    // Update
    this._router.post(
        AppRoutes.DB_ROUTES.updateMany,
        (req: Request, res: Response, next: NextFunction) => {
          this.updateMany(req, res, next);
        });

    // Delete
    this._router.post(
        AppRoutes.DB_ROUTES.deleteMany,
        (req: Request, res: Response, next: NextFunction) => {
          this.deleteMany(req, res, next);
        });
  }

  private createMany(req: Request, res: Response, next: NextFunction) {
    this.surveyService.surveyCreate(req.body as RequestModel)
        .then((result: SurveyResult) => res.json(result))
        .catch((err: Error) => res.status(404).send('createMany ERROR'));
  }

  private readMany(req: Request, res: Response, next: NextFunction) {
    this.surveyService.surveyRead(req.body as RequestModel)
        .then((result: SurveyResult) => res.json(result))
        .catch((err: Error) => res.status(404).send('readMany ERROR'));
  }

  private updateMany(req: Request, res: Response, next: NextFunction) {
    this.surveyService.updateMany(req.body as RequestModel)
        .then((result: SurveyResult) => res.json(result))
        .catch((err: Error) => res.status(404).send('updateMany ERROR'));
  }

  private deleteMany(req: Request, res: Response, next: NextFunction) {
    this.surveyService.deleteMany(req.body as RequestModel)
        .then((result: SurveyResult) => res.json(result))
        .catch((err: Error) => res.status(404).send('deleteMany ERROR'));
  }
}
