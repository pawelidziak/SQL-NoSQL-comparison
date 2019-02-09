import {DataModel} from '../../core/models/DataModel';
import {DbName, DbResult} from '../../core/models/DbResult';
import {OperationType} from '../../core/models/OperationType';
import {RequestModel} from '../../core/models/RequestModel';
import {GenerateData} from '../../utils/GenerateData';
import {MongoService} from './MongoService';


export class SurveyService {
  private mongoService: MongoService;

  constructor() {
    this.mongoService = new MongoService();
  }

  async surveyCreate(reqModel: RequestModel) {
    const objList: DataModel[] = GenerateData.getData(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.createMany(objList)
    });

    // MySQL

    return {
      operation: OperationType.CREATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async surveyRead(reqModel: RequestModel) {
    const objList: DataModel[] = GenerateData.getData(reqModel);

    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.readMany(objList)
    });

    // MySQL

    return {
      operation: OperationType.READ,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async updateMany(reqModel: RequestModel) {
    const objList: DataModel[] = GenerateData.getData(reqModel);

    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.updateMany(objList)
    });

    // MySQL

    return {
      operation: OperationType.UPDATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async deleteMany(reqModel: RequestModel) {
    const objList: DataModel[] = GenerateData.getData(reqModel);

    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.deleteMany(objList)
    });

    // MySQL

    return {
      operation: OperationType.DELETE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }
}
