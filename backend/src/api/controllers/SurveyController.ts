import {Request, Response, Router} from 'express';
import {NextFunction} from 'express-serve-static-core';

import {RequestModel} from '../../core/models/RequestModel';
import {SurveyResult} from '../../infrastructure/dto/SurveyResult';
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
      AppRoutes.DB_ROUTES.readNoIndx,
      (req: Request, res: Response, next: NextFunction) => {
        this.readNoIndexes(req, res, next);
      });
    this._router.post(
      AppRoutes.DB_ROUTES.readWithIndx,
      (req: Request, res: Response, next: NextFunction) => {
        this.readWithIndexes(req, res, next);
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

  private readNoIndexes(req: Request, res: Response, next: NextFunction) {
    this.surveyService.surveyReadNoIndexes(req.body as RequestModel)
      .then((result: SurveyResult) => res.json(result))
      .catch((err: Error) => res.status(404).send('readNoIndexes ERROR'));
  }

  private readWithIndexes(req: Request, res: Response, next: NextFunction) {
    this.surveyService.surveyReadWithIndexes(req.body as RequestModel)
      .then((result: SurveyResult) => res.json(result))
      .catch((err: Error) => res.status(404).send('readWithIndexes ERROR'));
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
