import {DataModel} from '../../core/models/DataModel';
import {DbName, DbResult} from '../../core/models/DbResult';
import {OperationType} from '../../core/models/OperationType';
import {RequestModel} from '../../core/models/RequestModel';
import {SurveyResult} from '../../core/models/SurveyResult';
import {GenerateData} from '../../utils/GenerateData';
import {MongoService} from './MongoService';


export class SurveyService {
  private mongoService: MongoService;

  constructor() {
    this.mongoService = new MongoService();
  }

  async surveyCreate(reqModel: RequestModel) {
    const objList: DataModel[] = GenerateData.getData(reqModel);

    /*
        CREATE FINAL RESULT OBJECT
     */
    const result: SurveyResult = {
      operation: OperationType.CREATE,
      quantity: reqModel.quantity,
      dbResult: []
    };

    /*
        CREATE MONGO RESULT
     */
    const mongoResult: DbResult = {
      dbName: DbName.MongoDB,
      time: await this.mongoService.createMany(objList)
    };

    /*
        CREATE MONGO RESULT
     */

    /*
        ADD DATABASES RESULTS TO FINAL RESULT
     */
    result.dbResult.push(mongoResult);

    return result;
  }

}
