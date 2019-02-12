import {DbName, DbResult} from '../../core/models/DbResult';
import {OperationType} from '../../core/models/OperationType';
import {ParentI} from '../../core/models/ParentModel';
import {RequestModel} from '../../core/models/RequestModel';
import {GenerateData} from '../../utils/GenerateData';

import {MongoService} from './MongoService';
import {MysqlService} from './MysqlService';


export class SurveyService {
  private mongoService: MongoService;
  private mysqlService: MysqlService;

  constructor() {
    this.mongoService = new MongoService();
    this.mysqlService = new MysqlService();
  }

  async surveyCreate(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.createMany(parentModels)
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.mysqlService.createMany(parentModels)
    });

    return {
      operation: OperationType.CREATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async surveyRead(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.readMany(parentModels)
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.mysqlService.readMany(parentModels)
    });

    return {
      operation: OperationType.READ,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async updateMany(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.updateMany(parentModels)
    });

    console.log(parentModels);

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.mysqlService.updateMany(parentModels)
    });

    return {
      operation: OperationType.UPDATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async deleteMany(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.mongoService.deleteMany(parentModels)
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.mysqlService.deleteMany(parentModels)
    });

    return {
      operation: OperationType.DELETE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }
}
