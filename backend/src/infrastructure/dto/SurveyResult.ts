import {OperationType} from '../../core/models/OperationType';

import {DbResult} from './DbResult';

export interface SurveyResult {
  operation: OperationType;
  quantity: number;
  dbSize: number;
  dbResult: DbResult[];
}
