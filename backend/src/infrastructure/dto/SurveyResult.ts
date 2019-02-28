import {DbResult} from './DbResult';
import {OperationType} from '../../core/models/OperationType';

export interface SurveyResult {
  operation: OperationType;
  quantity: number;
  dbResult: DbResult[];
}
