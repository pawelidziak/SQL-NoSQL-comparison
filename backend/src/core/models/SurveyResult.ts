import {DbResult} from './DbResult';
import {OperationType} from './OperationType';

export interface SurveyResult {
  operation: OperationType;
  quantity: number;
  dbResult: DbResult[];
}
